// src/app/api/verifyCode/route.ts
import { connectMongoDB } from "@/libs/mongodb";
import ForgotPassword from "@/models/forgotPassword";

// Named export for the POST method
export async function POST(req: any) {
  await connectMongoDB();
    // console.log('req body', req.json());
  
  try {
    const { email, code } = await req.json();
    console.log('email code', email, code);
    const forgotPasswordEntry = await ForgotPassword.findOne({ email }).sort({expirationTime: -1}).exec();
    if (!forgotPasswordEntry) {
      console.log('not found');
      return new Response(JSON.stringify({ message: "Code not found or already used." }), { status: 404 });
    }

    const currentTime = new Date();

    if (forgotPasswordEntry.code === parseInt(code, 10) && forgotPasswordEntry.expirationTime > currentTime) {
      // Verification successful
      console.log("Verification successful");
      return new Response(JSON.stringify({ message: "Verified successfully." }), { status: 200 });
    } else {
      // Verification failed
      console.log("Verification failed");
      return new Response(JSON.stringify({ message: "Invalid or expired verification code." }), { status: 400 });
    }
  } catch (error) {
    console.error("Error during verification:", error);
    return new Response(JSON.stringify({ message: "An error occurred during verification." }), { status: 500 });
  }
}
