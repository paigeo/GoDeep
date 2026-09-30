import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: [{ path: "../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [{ path: "../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoDeep — Go deeper with the right people",
  description: "Coordinate trips, plans, and meaningful time together without the group chat chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
