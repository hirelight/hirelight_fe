import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import acceptLanguage from "accept-language";

import { i18n, languages } from "../i18n.config";

acceptLanguage.languages(languages);

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({
        headers: negotiatorHeaders,
    }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

function getCurLocale(req: NextRequest): string {
    const pathname = req.nextUrl.pathname;

    const data = pathname.split("/")[1];

    return data;
}

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host")!!;
    const pathname = url.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        locale =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    const locale = getLocale(req);
    const curLocale = getCurLocale(req);

    // Redirect if there is unsupport locale
    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}${
                    url.search
                }`,
                req.url
            )
        );
    }

    if (
        hostname === "localhost:3000" ||
        hostname === "www.localhost:3000" ||
        hostname === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
        hostname === `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    ) {
        return NextResponse.rewrite(
            new URL(`${pathname}${url.search}`, req.url)
        );
    }

    if (
        hostname === "jobs.localhost:3000" ||
        hostname === `jobs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    ) {
        return NextResponse.rewrite(
            new URL(
                `/${curLocale}/interviewee${pathname.replace(
                    `/${curLocale}`,
                    ""
                )}${url.search}`,
                req.url
            )
        );
    }

    if (
        hostname === "admin.localhost:3000" ||
        hostname === `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    ) {
        return NextResponse.rewrite(
            new URL(
                `/${curLocale}/admin${pathname.replace(`/${curLocale}`, "")}${
                    url.search
                }`,
                req.url
            )
        );
    }

    return NextResponse.rewrite(
        new URL(
            `/${curLocale}/organization/${
                hostname.split(".")[0]
            }${pathname.replace(`/${curLocale}`, "")}${url.search}`,
            req.url
        )
    );
}

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
