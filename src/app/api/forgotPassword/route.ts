import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { SendEmail } from "@/components/Sendmailer";
// const crypto = require('crypto');
import crypto from 'crypto';
import ForgotPassword from "@/models/forgotPassword";

export async function POST(req:any) {
    const { email } = await req.json();
    // let token = 'abcdefghij12345';
    let code = Number(Math.floor(1000 + Math.random()*9000));
    await connectMongoDB();

    

    async function generateResetToken(email: any) {
        // Generate a random token
        const token = crypto.randomBytes(20).toString('hex');
        console.log('forgot token', token);
      
        // Set token expiration time (e.g., 1 hour from now)
        const expirationTime = new Date(Date.now() + 3600000); // 3600000 milliseconds = 1 hour
      
        // Save the token, email, and expiration in the database
        // Assuming you have a function to save this info to your database
        const res = await saveTokenToDatabase(token, email, expirationTime);
        console.log('res',res);
        return token;
      }

      async function saveTokenToDatabase(token: any, email: any, expirationTime: any) {
        const newToken = new ForgotPassword({
            email,
            token,
            code,
            expirationTime,
        });
    
        const res = await newToken.save();
        console.log('res',res);
    }

    try {

        const token = await generateResetToken(email);
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ email });
        if(!user){
            console.log('user not found');
        }else{
            console.log('user found');
           await SendEmail({email: email, emailType: 'Reset', token: token, code: code});
        }
        return NextResponse.json({ message: "Reset Mail sent." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while reseting the password." },
            { status: 500 }
        );
    }
}