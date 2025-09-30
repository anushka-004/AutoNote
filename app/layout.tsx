import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeetWise - AI-Powered Meeting Platform",
  description: "Modern video conferencing with intelligent meeting notes generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
