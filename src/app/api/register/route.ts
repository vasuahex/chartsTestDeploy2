import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SendEmail } from "@/components/Sendmailer";
import crypto from 'crypto';

export async function POST(req: any) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(20).toString('hex');
        const verifyTokenExpires = new Date();
        verifyTokenExpires.setHours((verifyTokenExpires.getHours() + 24));
        console.log('token', token);
        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword, verifyToken: token, verifyTokenExpires: verifyTokenExpires });
        // await SendEmail({email: email, emailType: 'Verify', token: token, code:0})
        // try {
        //     await SendEmail({ email: email, emailType: 'Verify', token: token, code: 0 })

        // }
        // catch (error: any) {
        //     console.error("Error sending email:", error);
        //     // return res.status(Internal server error).json({ message: "Internal server error" });
        //     return NextResponse.json({ message: "Internal server error." }, { status: 500 });
        // }

        const response = await SendEmail({ email: email, emailType: 'Verify', token: token, code: 0 })
        console.log("resposeSend", response);

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}