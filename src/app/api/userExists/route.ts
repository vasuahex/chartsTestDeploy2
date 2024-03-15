import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req:any) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email });
        return NextResponse.json({ user },{status: 200});
            } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
    }
}