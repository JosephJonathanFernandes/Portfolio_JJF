import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Joseph Fernandes | Embedded-first Software Engineer",
  description: "Final-year Computer Engineering student specializing in embedded systems, AI/ML, and full-stack development. Visteon intern with hackathon experience.",
  keywords: ["Joseph Fernandes", "Software Engineer", "Embedded Systems", "AI/ML", "Full-Stack Developer", "Visteon", "NASA Hackathon"],
  authors: [{ name: "Joseph Jonathan Fernandes" }],
  creator: "Joseph Jonathan Fernandes",
  openGraph: {
    title: "Joseph Fernandes | Embedded-first Software Engineer",
    description: "Building reliable software from embedded C to modern web platforms",
    url: "https://joseph-fernandes.vercel.app",
    siteName: "Joseph Fernandes Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Fernandes | Embedded-first Software Engineer",
    description: "Building reliable software from embedded C to modern web platforms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
