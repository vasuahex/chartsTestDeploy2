
import { connectMongoDB } from "@/libs/mongodb";
import DataItem from "@/models/dataItem";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";

export async function DELETE(req: any) {
    // Ensure there's a session first
    const session: any = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract user_id from the session and contentId from the request
    const user_id = session.user.id;
    let reqBody;
    try {
        reqBody = await req.json();
    } catch (error) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
    const { contentId } = reqBody;

    if (!contentId) {
        return NextResponse.json({ message: "Content ID is required" }, { status: 400 });
    }

    try {
        await connectMongoDB();

        // Pull (remove) the content from the content array where the contentId matches
        const result = await DataItem.updateOne(
            { user_id },
            { $pull: { content: { _id: contentId } } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Content not found or already deleted" }, { status: 404 });
        }

        return NextResponse.json({ message: "Content deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting content:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

