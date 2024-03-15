import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},

            async authorize(credentials: any) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
    callbacks: {
        async session({ session }: any) {
            const sessionUser = await User.findOne({ email: session?.user?.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ account, profile, user, credentials }: any) {
            if (account?.provider === "credentials") {
                return true
            }
            if (account?.provider === "google") {
                try {
                    await connectMongoDB();
                    const userExists = await User.findOne({ email: profile.email });
                    if (!userExists) {
                        await User.create({
                            email: profile.email,
                            name: profile.name.replace(" ", "").toLowerCase(),
                            image: profile.picture,
                            isVerified: true
                        });
                    }
                    return true
                } catch (error: any) {
                    console.log("Error checking if user exists: ", error.message);
                    return false
                }
            }
        },
        async redirect({ url, baseUrl }: any) {
            return baseUrl
        },
    },
};