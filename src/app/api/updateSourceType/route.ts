import { connectMongoDB } from "@/libs/mongodb";
import DataItem from "@/models/dataItem";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";


export async function POST(req:any) {
   
    const session: any = await getServerSession(authOptions);
    const user_id = session.user.id;
 
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" },{'status': 400});
    }

    try {
      await connectMongoDB();
      const {contentId, newSourceType} = await req.json();

        const dataItem = await DataItem.findOne({ user_id });
        if(dataItem){
          if(contentId && newSourceType){

            const content = dataItem.content.filter((each: any)=> each._id?.toString() == contentId?.toString());
              // console.log('content', content);
            if (!content.length) {
              return NextResponse.json({ message: "Content not found." }, { status: 404 });
            }
            content[0].SourceType = newSourceType;
      
              // await DataItem.updateOne(
              //   { user_id, 'content._id': contentId },
              //   { $set :{'content.$.SourceType': newSourceType }})
            await dataItem.save();
              
      
            }else{
              
              await DataItem.updateMany(
              { user_id, "content.SourceType": "current" },
              { $set: { "content.$[].SourceType": "recent" } }
            );
      
            const dataItem = await DataItem.findOne({ user_id});
            const contentsArray = dataItem.content;
            contentsArray[contentsArray.length - 1].SourceType = 'current';
            await dataItem.save();
      
            }
      
      
            
            return NextResponse.json({ message: "Data SourceType updated successfully" },{'status': 200});
        }
        else{
          // console.error("Error updating SourceType:", error);
        return NextResponse.json({ 'message': "No Data Item found" },{'status': 200});
        }

      // console.log('contentId, newSourceType',contentId, newSourceType);
      
    } catch (error) {
      console.error("Error updating SourceType:", error);
      return NextResponse.json({ 'message': "Failed to update SourceType" },{'status': 500});
    }
  }
  