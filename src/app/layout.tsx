import "./globals.scss";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { Inter, Public_Sans, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";

import "react-toastify/dist/ReactToastify.css";

import "nprogress/nprogress.css";

import { ThemeProvider } from "@/components";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
import InternationalizationProvider from "@/components/InternationalizationProvider";

import { Locale, i18n } from "../../i18n.config";

const TopProgressBar = dynamic(
    () => import("@/components/TopProgressBar/TopProgressBar"),
    {
        ssr: false,
    }
);

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto-mono",
});
const publicSans = Public_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-public-sans",
});

export const metadata: Metadata = {
    title: "Hirelight",
};

export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    return (
        <html lang={params.lang}>
            <body
                className={`${inter.className} ${roboto_mono.className} ${publicSans.className}`}
            >
                <InternationalizationProvider lang={params.lang}>
                    <ThemeProvider theme={"light"}>
                        <TopProgressBar />
                        <ReduxProvider>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                            {children}
                            <div id="hirelight__portal"></div>
                        </ReduxProvider>
                    </ThemeProvider>
                </InternationalizationProvider>
                <Analytics />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></Script>
            </body>
        </html>
    );
}
