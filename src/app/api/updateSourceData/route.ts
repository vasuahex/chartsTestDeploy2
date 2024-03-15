import { connectMongoDB } from "@/libs/mongodb";
import DataItem from "@/models/dataItem";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";


export async function POST(req: any) {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user_id = session.user.id;
  const body = await req.json();
  console.log('Received data:', body);

  try {
    await connectMongoDB();
    const dataItem = await DataItem.findOne({ user_id });

    switch (body.operationType) {
      case "save":
        // Assume `body.contents` is an array of new contents to be saved
        // Validate `body.contents` here
        if (!body.contents || !body.contents.length) {
          return NextResponse.json({ message: "Missing content data for save operation." }, { status: 400 });
        }
        await DataItem.findOneAndUpdate(
          { user_id }, 
          { $push: { content: { $each: body.contents } } }, 
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        console.log('Data saved successfully');
        return NextResponse.json({ message: "Data Saved in DB.", content: body.contents }, { status: 200 });

      case "update":
        // Extracting necessary fields for update from `body`
        const { updateType, contentId, newFileName, newSourceType, newSourceStatus } = body;

        if (!contentId) {
          return NextResponse.json({ message: "Missing contentId for update operation." }, { status: 400 });
        }
        if (!dataItem) {
          return NextResponse.json({ message: "Data item not found." }, { status: 404 });
        }

        // Reuse the existing switch-case logic for different update types
        switch (updateType) {
          case "renameContent":
            if (!newFileName) {
              return NextResponse.json({ message: "Missing newFileName for renaming content." }, { status: 400 });
            }
            const contentToRename = dataItem.content.id(contentId);
            if (contentToRename) {
              contentToRename.fileName = newFileName;
            } else {
              return NextResponse.json({ message: "Content not found." }, { status: 404 });
            }
            break;
          case "updateSourceType":
            if (!newSourceType) {
              return NextResponse.json({ message: "Missing newSourceType for updating source type." }, { status: 400 });
            }
            const contentToUpdate = dataItem.content.id(contentId);
            if (contentToUpdate) {
              contentToUpdate.SourceType = newSourceType;
            } else {
              return NextResponse.json({ message: "Content not found." }, { status: 404 });
            }
            break;
            case "updateStatus":
            if (!newSourceStatus) {
              return NextResponse.json({ message: "Missing newSourceType for updating source type." }, { status: 400 });
            }
            const UpdateContent = dataItem.content.id(contentId);
            if (UpdateContent) {
              UpdateContent.SourceType = newSourceStatus;
            } else {
              return NextResponse.json({ message: "Content not found." }, { status: 404 });
            }
            break;
          default:
            return NextResponse.json({ message: "Invalid update type or missing required fields." }, { status: 400 });
        }

        await dataItem.save();
        console.log('Data updated successfully');
        return NextResponse.json({ message: "Update successful" }, { status: 200 });

      default:
        return NextResponse.json({ message: "Invalid operation type." }, { status: 400 });
    }
  } catch (error:any) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Failed to process request", error: error.toString() }, { status: 500 });
  }
}
