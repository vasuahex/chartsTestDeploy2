import { connectMongoDB } from "@/libs/mongodb";
import ChartModel from "@/models/chart";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";

interface ChartRequestPayload {
  Options: {
    ChartType: string;
    Dimensions: string[];
    Measures: string[];
    Filters: string[];
  };
  Data: {
    "X-keys": string[];
    "Y-keys": number[]; // Assuming Y-keys are numbers
  }[];
  Styles: Record<string, any>;
}


export async function POST(req: any) {
  const session: any = await getServerSession(authOptions);
 
  // console.log("session", session);
  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in to perform this action." },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    // console.log(req.body);
// Log the entire request body
console.log("Received request body:", req.body);

    await connectMongoDB();

    // Extract chart data from the request body
    const chartData : ChartRequestPayload  = await req.json();

    // Create a new chart document
    const newChart = new ChartModel(chartData);

    // console.log("newch", newChart)
    // Save the new chart to the database
    await newChart.save();

    return NextResponse.json(
      { message: "Chart Saved Successfully to DB", status: "Success" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to save chart data to DB:", error);
    return NextResponse.json(
      {
        message: "An error occurred while saving the chart data to DB.",
        status: "Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
