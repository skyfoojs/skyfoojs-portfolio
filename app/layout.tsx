import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Foo Jia Seng | Software Engineer & Backend Developer",
  description:
    "Personal portfolio of Foo Jia Seng — Software Engineering student from Malaysia specializing in backend development with Node.js, TypeScript, and modern cloud technologies.",
  keywords: [
    "Foo Jia Seng",
    "Software Engineer",
    "Backend Developer",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "Malaysia",
    "Portfolio",
  ],
  authors: [{ name: "Foo Jia Seng", url: "https://github.com/skyfoojs" }],
  creator: "Foo Jia Seng",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foojiaseng.dev",
    title: "Foo Jia Seng | Software Engineer & Backend Developer",
    description:
      "Software Engineering student from Malaysia building scalable web applications with Node.js, TypeScript, and modern cloud technologies.",
    siteName: "Foo Jia Seng Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/skyfoojs",
        width: 1200,
        height: 630,
        alt: "Foo Jia Seng Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foo Jia Seng | Software Engineer & Backend Developer",
    description:
      "Software Engineering student from Malaysia building scalable web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
