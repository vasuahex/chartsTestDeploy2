// pages/api/renameContent.js

import DataItem from "@/models/dataItem";
// import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/Authoptions";
import { connectMongoDB } from "@/libs/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function PATCH(req: any, res: any) {

const session: any = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "You must be logged in to rename content." }, { status: 401 });
  }

  const user_id = session.user.id;
  const { contentId, newFileName } = await req.json();
  // console.log('contentId',contentId,'newFileName',newFileName)

  try {
    await connectMongoDB();

    // Find the DataItem document for the user
    const dataItem = await DataItem.findOne({ user_id });
    // console.log('dataItem',dataItem)
    if (!dataItem) {
      return NextResponse.json({ message: "Data item not found." }, { status: 404 });
    }

    // Find the specific content subdocument and rename it
    const content = dataItem.content.filter((each: any)=> each._id?.toString() == contentId?.toString());
    // console.log('content',content);
    if (!content.length) {
      return NextResponse.json({ message: "Content not found." }, { status: 404 });
    }
    content[0].fileName = newFileName;
    
    // Save the modified DataItem document
    await dataItem.save();

    return NextResponse.json({ message: "Content renamed successfully", content, dataItem, contentId }, { status: 200 });
  } catch (error: any) {
    console.error("Error renaming content:", error);
    return NextResponse.json({ message: "Failed to rename content", error: error.toString() }, { status: 500 });
  }
}
