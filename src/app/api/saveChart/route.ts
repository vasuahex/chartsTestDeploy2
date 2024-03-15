import { connectMongoDB } from "@/libs/mongodb";
import ChartModel from "@/models/chart";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/Authoptions";
import { getServerSession } from "next-auth";

export async function POST(req: any) {
  console.log(req.body,'asdasdasd');
}
