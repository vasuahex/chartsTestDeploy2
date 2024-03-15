
import { connectMongoDB } from "@/libs/mongodb";
import DataItem from "@/models/dataItem";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";



export async function POST(req:any) {
    const contents = await req.json();
    console.log('contents',contents);
    // const contents = req.body
    const session: any = await getServerSession(authOptions);
    const user_id = session.user.id;
    // let newContent  = {fileName, SourceType, data }

    console.log('session',session,'newContent',contents);
    if (!session) {
      return NextResponse.json({ message: "You must be logged in to save data." }, { status: 400 });
    }
   
    try {
      await connectMongoDB();
      // const updatedContents = contents.map((item: any) => {
      //   switch(item.SourceType) {
      //     case 'file':
      //       // Assuming 'data' contains file info
      //       item.data = new fileDataSchema(item.data);
      //       break;
      //     case 'link':
      //       // Assuming 'data' contains url
      //       item.data = new linkDataSchema(item.data);
      //       break;
      //     case 'text':
      //       // Assuming 'data' contains text
      //       item.data = new textDataSchema(item.data);
      //       break;
      //   }
      //   return item;
      // });
  
      // await DataItem.findOneAndUpdate(
      //   { user_id }, 
      //   { $push: { content: { $each: updatedContents } } }, 
      //   { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
      // );

      await DataItem.findOneAndUpdate(
        {user_id}, 
        { $push: { content: { $each: contents } } }, 
        {new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true})

        console.log('data got saved');
        return NextResponse.json({ 'message': "Data Saved in DB.", 'content': contents }, { status: 200 });
    } catch (error) {
      console.error("Failed to save data item:", error);
      return NextResponse.json(
        { 'message': "An error occurred while saving the data in DB.",'error': error},
        { status: 500 }
    );
    }
  } 





  
export async function PUT(req: any, res: any) {
  // const contents = await req.json();
  const { dataItemId, contentId, updatedContentData } = await req.json(); // Assume these are provided in the request body
  const session: any = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "You must be logged in to view data." }, { status: 401 });
  }

  try {
    await connectMongoDB();

    // Use the $ positional operator to update the first subdocument that matches the condition
    const result = await DataItem.findOneAndUpdate(
      { _id: dataItemId, 'content._id': contentId },
      { $set: { 'content.$': updatedContentData } },
      { new: true }
    );

    if (!result) {
      // return res.status(404).json({ message: "Content not found." });
      return NextResponse.json({ message: "Content not found." });

    }

    return NextResponse.json({ message: "Content updated successfully.", content: result.content.id(contentId) });
  } catch (error) {
    console.error("Failed to update content:", error);
    return NextResponse.json({ message: "An error occurred while updating the content.", 'error': error });
  }
}


// export async function POST(req: any, res: any) {
//   const session: any = await getServerSession(authOptions);
//     const user_id = session.user.id;
//   if (!session) {
//     return res.status(401).json({ message: "You must be logged in to save data." });
//   }

//   // const user_id = session.user.id;
//   const contents = req.body; // This is now an array of objects

//   try {
//     await connectMongoDB();
//     // Create a new DataItem or push to the existing one
//     const updatedDataItem = await DataItem.findOneAndUpdate(
//       { user_id },
//       { $push: { content: { $each: contents } } }, // Use $each to push each item of the array
//       { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
//     );

//     return res.status(200).json({ message: "Data Saved in DB.", contents: updatedDataItem.content });
//   } catch (error) {
//     console.error("Failed to save data:", error);
//     return res.status(500).json({ message: "An error occurred while saving the data." });
//   }
// }


// import { connectMongoDB } from "@/libs/mongodb";
// import DataItem from "@/models/dataItem";
// import { getSession } from "next-auth/react";


