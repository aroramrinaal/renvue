import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  keywords: [
    "exist yet",
    "existyet",
    "exist yet?",
    "existyet?",
    "product idea",
    "product idea analysis",
    "produ  ct idea validation",
    "product idea competition",
    "product idea gap",
    "product idea uniqueness",
    "product idea market",
    "product idea validation",
    "product idea competition",
    "product idea gap",
    "product idea uniqueness",
    "product idea market",
    "product idea validation",
    "product idea competition",
    "product idea gap",
    "product idea uniqueness",
    "product idea market",
    "exist yet",
    "does this exist",
    "doesthisexist",
  ],
  title: {
    default: "Renvue",
    template: "%s | Renvue",
  },
  description: "",
  openGraph: {
    description:
      "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Nwd5RkeoZNLmMr6zqVu-A3I5zycrCJ7m_b4u4CuXSmk"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
