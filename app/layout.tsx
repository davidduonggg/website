import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Duong | Personal Website",
  description:
    "David Duong's personal website for backend systems, infrastructure, and data platforms.",
  icons: {
    icon: "/icon.svg",
  },
  metadataBase: new URL("https://website-davidduonggg.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
