
import { connectMongoDB } from "@/libs/mongodb";
import DataItem from "@/models/dataItem";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";

export async function POST(req: any) {
  const session: any = await getServerSession(authOptions);

  const {dimensions,measures} = await req.json();
//   const { contentId } = req.query;
  // console.log('contentId',contentId);
  
  if (!session) {
    return NextResponse.json({ message: "You must be logged in to view data." }, { status: 401 });
  }

  const user_id = session.user.id;

  try {
    await connectMongoDB();

    const dataItem = await DataItem.findOne({ user_id });
    console.log("dataItem",dataItem);
    

    // if (!dataItem) {
    //   return NextResponse.json({ 'message': "Data not found." }, { status: 200 });
    // }

    // const content = dataItem.content.id(contentId);
    // if (!content) {
    //   return NextResponse.json({ message: "Content not found." }, { status: 200 });
    // }

    return NextResponse.json({ content: dataItem }, { status: 200 });
    
    // return NextResponse.json({ data: dataItem }, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve data item:", error);
    return NextResponse.json(
      { message: "An error occurred while retrieving the data from DB." },
      { status: 500 }
    );
  }
}
