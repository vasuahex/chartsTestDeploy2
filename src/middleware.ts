import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const userProtectedRoutes = ["/personalassistant", "/chartbuilder", "/charts"];
    const { pathname } = request.nextUrl;
    const token = await getToken({ req: request });
    // console.log(pathname, "pathname");
    // console.log(userProtectedRoutes.includes(pathname), "pathname");
    if (token == null && (pathname.startsWith("/chartbuilder") || userProtectedRoutes.includes(pathname))) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }
}