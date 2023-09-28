import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    const hostname = req.headers.get("host")!;
    // .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = url.pathname;
    const response = NextResponse.next();
    // rewrites for app pages
    // if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //   const session = localStorage.getItem('token');
    //   if (!session && path !== '/login') {
    //     return NextResponse.redirect(new URL('/login', req.url));
    //   } else if (session && path == '/login') {
    //     return NextResponse.redirect(new URL('/', req.url));
    //   }
    //   return NextResponse.rewrite(
    //     new URL(`/app${path === '/' ? '' : path}`, req.url)
    //   );
    // }

    // special case for `vercel.pub` domain
    // if (hostname === 'vercel.pub') {
    //   return NextResponse.redirect(
    //     'https://vercel.com/blog/platforms-starter-kit'
    //   );
    // }
    // console.log(hostname, path);
    // rewrite root application to `/app` folder
    if (
        hostname === "localhost:3000" ||
        hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
        return NextResponse.rewrite(new URL(`${path}`, req.url));
    }

    if (
        hostname === "jobs.localhost:3000" ||
        hostname === `jobs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    ) {
        response.cookies.set({
            name: "hirelight_access_token",
            value: "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJuZ2tpZW4yOTlAZ21haWwuY29tIiwiZW1haWwiOiJuZ2tpZW4yOTlAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ0FORElEQVRFIiwicm9sZSI6IkNBTkRJREFURSIsImV4cCI6MTY5NTcyNzIzMX0.q6HjYGDbQc-pKma5yP3XIvXMlie9_M-Yhkgz-F0162YESuGshlyVjSe6I4ONElaE6xM7QYbnfqmsacxrvKzqxg",
            httpOnly: true,
            domain: ".locahost:3000",
        });

        return NextResponse.rewrite(new URL(`/interviewee${path}`, req.url));
    }

    // rewrite everything else to organization folder `/organization/[domain]/[path] dynamic route
    return NextResponse.rewrite(
        new URL(`/organization/${hostname.split(".")[0]}${path}`, req.url)
    );
}
