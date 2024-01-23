import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import Script from "next/script";

import "react-toastify/dist/ReactToastify.css";

import "nprogress/nprogress.css";

import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import { i18n } from "../../i18n.config";

import "./globals.scss";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

const publicSans = Public_Sans({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Hirelight",
};

export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({
    children,
    params: { lng },
}: {
    children: React.ReactNode;
    params: any;
}) {
    return (
        <html lang={lng}>
            <body className={`${inter.className} ${publicSans.className}`}>
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                    <GoogleAnalytics
                        ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
                    />
                ) : null}

                <ReactQueryProvider>
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
                </ReactQueryProvider>

                <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></Script>
            </body>
        </html>
    );
}
