import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname, origin } = req.nextUrl;

  //   Allow the requests if the following is true...
  // 1) Its a request for next-auth session & provider fetching
  // 2) the token exists and
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  // Redirect them to login if they dont have token AND are requestting a proctected route
  if (!token && pathname !== "/login") {
    return NextResponse.rewrite(new URL("/login", req.url));
    // return NextResponse.redirect("/login");
  }
};
