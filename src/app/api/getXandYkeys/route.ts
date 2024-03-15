
import { connectMongoDB } from "@/libs/mongodb";
// import getXandYkeys from "@/models/getXandYkeys";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";
import DataItem from "@/models/dataItem";

export async function GET(req: any) {
  const session: any = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "You must be logged in to view data." }, { status: 400 });
  }

  const user_id = session.user.id;

  try {
    await connectMongoDB();
    const dataItem = await DataItem.findOne({ user_id });
    const activeDataSource=dataItem?.content?.filter((item:any)=>item.status==="active")
    const fileName=activeDataSource[0].fileName;
    // console.log("dataItem111",activeDataSource[0].data);
    let dimensions: string[] = [];
    let measures: string[] = [];

  const isNumeric = (defaultData: any) => {
    defaultData?.forEach((item: any) => {
      Object.entries(item).forEach(([key, value]: any) => {
        // Try to convert the value to a number
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          // If the value is a valid number, add it to numericKeys
          if (!measures.includes(key)) {
            measures.push(key);
          }
        } else if (typeof value === "string" && !dimensions.includes(key)) {
          // If it's a string, add to alphabeticKeys
          dimensions.push(key);
        }
      });
    });
  };

  // Assuming defaultData is your original data object
  if (activeDataSource[0]?.data) {
    isNumeric(activeDataSource[0]?.data);
  }

    return NextResponse.json({fileName,  dimensions,measures}, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve data item:", error);
    return NextResponse.json(
      { message: "An error occurred while retrieving the data from DB." },
      { status: 500 }
    );
  }
}
