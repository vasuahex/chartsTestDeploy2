
import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/user";

export async function POST(req: any) {
    const { token, email } = await req.json();
    console.log('token, email', token, email);
    await connectMongoDB();
    
    // Check if a user with the given email exists, regardless of the token or its expiration
    const user = await User.findOne({ email });

    if (user) {
        // User exists, now check if the token matches and is not expired
        if (user.verifyToken === token && user.verifyTokenExpires && new Date(user.verifyTokenExpires) > new Date()) {
            // Token is valid and not expired, verify the user
            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpires = undefined;
            await user.save();
            console.log('verified true');

            return new Response(JSON.stringify({ message: "Email verified successfully!", action: 'redirect', redirectUrl: '/login' }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            // Token is invalid or expired, delete the user only if it wasn't already marked as verified
            if (!user.isVerified) {
                await User.deleteOne({ email });
                console.log('user deleted due to expired or invalid token');

                return new Response(JSON.stringify({ message: "Token expired or invalid, user deleted. Please re-register.", action: 'redirect', redirectUrl: '/register' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                // User was already verified, but the token is expired or doesn't match
                return new Response(JSON.stringify({ message: "User already verified. Please Sign In.", action: 'redirect', redirectUrl: '/login' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        }
    } else {
        // No user found with the given email, indicate that no action is needed
        return new Response(JSON.stringify({ message: "No action needed. User does not exist or was already deleted.", action: 'redirect', redirectUrl: '/register' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
