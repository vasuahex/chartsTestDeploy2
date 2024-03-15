"use client"
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

const VerifyEmail = () => {
    const router = useRouter();
    const [isVerfying, setIsVerifying] = useState(false);

    return (
        <div>
            <Suspense>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
};

const VerifyEmailContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVerfying, setIsVerifying] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        if (token && email) {
            verifyEmailFunction(token, email);
        }

    }, []);

    const verifyEmailFunction = async (token: any, email: any) => {
        if (isVerfying) {
            return;
        }
        setIsVerifying(true);
        console.log('token, email', token, email);
        try {
            const res = await fetch("api/verifyEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    email: email,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Email verified successfully!, Please Login');
                router.push('/login?verified=true');
            } else {
                data.message == "User already verified. Please Sign In." ? toast.success(data.message) : toast.error(data.message);

                if (data.action && data.action === 'redirect') {
                    router.push(data.redirectUrl);
                }
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsVerifying(false)
        }
    };

    return (
        <div>
            Verifying your email...
        </div>
    );
};

export default VerifyEmail;
