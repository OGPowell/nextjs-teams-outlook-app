// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (process.env.VERCEL_ENV === "preview") return;

    if (!request.nextauth.token) {
      // return NextResponse.rewrite(new URL("/api/auth/signin", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
