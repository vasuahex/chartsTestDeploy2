import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/Authoptions";
import RegisterForm from '../../components/auth/RegisterForm';
import { redirect } from 'next/navigation';
export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) redirect("/");

    return (
        <main>
            <RegisterForm />
        </main>
    );
}