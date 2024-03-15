// src/app/api/updatePassword/route.ts
import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import ForgotPassword from "@/models/forgotPassword";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  await connectMongoDB();

  try {
    const { email, code, newPassword } = await req.json();
    console.log('email, code, newPassword',email, code, newPassword);
    // Find the latest password reset entry for the email
    const forgotPasswordEntry = await ForgotPassword.findOne({ email }).sort({ createdAt: -1 }).exec();

    // Check if the code is valid and not expired
    // if (forgotPasswordEntry && forgotPasswordEntry.code === code && forgotPasswordEntry.expirationTime > new Date()) {
    if (forgotPasswordEntry) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update the user's password
      await User.findOneAndUpdate({ email }, { password: hashedPassword });

      // Invalidate the verification code after successful password reset
      await ForgotPassword.deleteOne({ _id: forgotPasswordEntry._id });

      return new Response(JSON.stringify({ message: "Password updated successfully." }), { status: 200 });
    } else {
      // Invalid or expired code
      return new Response(JSON.stringify({ message: "Invalid or expired verification code." }), { status: 400 });
    }
  } catch (error) {
    console.error("Error during password update:", error);
    return new Response(JSON.stringify({ message: "An error occurred during password update." }), { status: 500 });
  }
}
