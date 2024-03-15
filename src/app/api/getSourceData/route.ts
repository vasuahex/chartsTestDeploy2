
import { connectMongoDB } from "@/libs/mongodb";
import DataItem from "@/models/dataItem";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";


export async function GET(req: any) {
  const session: any = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user_id = session.user.id;
  //  const contentId2 = await req.json() 
  console.log("Query parameters received:", req?.query);
  // const  contentId = undefined; 
  // const {contentId} = req ? await req.json() : {contentId: undefined}; // Use query parameters to determine the request type
  const contentId = req?.query?.contentId; 
  console.log('contentId',contentId);

  try {
    await connectMongoDB();

    if (contentId) {
    //   // Fetch a specific content by ID
    //   const dataItem = await DataItem.findOne({ "content._id": contentId, user_id });
    //   const specificContent = dataItem ? dataItem.content.id(contentId) : null;

    //   if (!specificContent) {
    //     return NextResponse.json({ message: "Content not found." }, { status: 404 });
    //   }

    //   return NextResponse.json({ content: specificContent }, { status: 200 });

    const dataItem = await DataItem.findOne({ user_id });

      if (!dataItem) {
        return NextResponse.json({ message: "Data not found." }, { status: 404 });
      }

      let specificContentUpdated = false;

      // Update the status of the selected content to 'active'
      // and set all others to 'inactive'
      for (let content of dataItem.content) {
        if (content._id.toString() === contentId) {
          content.status = 'active';
          specificContentUpdated = true;
        } else {
          content.status = 'inactive';
        }
      }

      if (!specificContentUpdated) {
        return NextResponse.json({ message: "Content not found." }, { status: 404 });
      }

      await dataItem.save(); // Save the changes to the database

      return NextResponse.json({ message: "Status updated successfully.", content: dataItem.content.id(contentId) }, { status: 200 });
    
    } else {
      

    const dataItem = await DataItem.findOne({ user_id });

    if (!dataItem) {
      return NextResponse.json({ message: "Data not found." }, { status: 200 });
    }

    return NextResponse.json({ data: dataItem }, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error retrieving data item:", error);
    return NextResponse.json({ message: "Failed to retrieve data items", error: error.toString() }, { status: 500 });
  }
}
