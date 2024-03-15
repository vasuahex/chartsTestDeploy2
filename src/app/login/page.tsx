import LoginForm from "../../components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/Authoptions";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) redirect("/");

    return (
        <main>
            <LoginForm />
        </main>
    );
}