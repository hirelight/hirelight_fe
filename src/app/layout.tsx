import "./globals.scss";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import Script from "next/script";

import "react-toastify/dist/ReactToastify.css";

import "nprogress/nprogress.css";

import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import InformModal from "@/components/InformModal";

import { i18n } from "../../i18n.config";

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
                        {process.env.NODE_ENV === "production" && (
                            <InformModal
                                content={
                                    <span>
                                        <b>Hirelight</b> is now deploying using{" "}
                                        <b>Azure Cloud Services free tier</b>.
                                        <br /> The application might encounter
                                        time out issue on server due to Azure
                                        free tier service will stop{" "}
                                        <b>
                                            after a period of time without any
                                            users access to the application
                                        </b>
                                        .<br />
                                        Please retry serveral time so that the
                                        server can start for services.
                                    </span>
                                }
                            />
                        )}
                        {children}
                        <div id="hirelight__portal"></div>
                    </ReduxProvider>
                </ReactQueryProvider>
                <Analytics />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></Script>
            </body>
        </html>
    );
}
