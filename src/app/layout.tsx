import "./globals.scss";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import type { Metadata } from "next";
import {
    Inter,
    Montserrat,
    Poppins,
    Public_Sans,
    Roboto_Mono,
} from "next/font/google";
import Script from "next/script";

import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";

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
// const publicSans = Public_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-public-sans',
// });

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} ${roboto_mono.className} ${montserrat.className} ${poppins.className}`}
            >
                <ReduxProvider>{children}</ReduxProvider>
                <Script src="../../node_modules/flowbite/dist/flowbite.min.js"></Script>
            </body>
        </html>
    );
}
