import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jjf-eight.vercel.app'),
  title: "Joseph Jonathan Fernandes | Systems & AI Software Engineer",
  description: "Systems and AI Software Engineer joining Visteon. Built real-time ISL recognition (98.33% acc) & CmdBridge. Computer Engineering graduate from GEC Goa.",
  keywords: ["jjf", "joseph fernandes", "joseph jonathan fernandes", "jonathan fernandes", "GEC goa", "GEC", "Goa Engineering College", "Software Engineer", "Embedded Systems", "AI/ML", "Visteon"],
  authors: [{ name: "Joseph Jonathan Fernandes" }],
  creator: "Joseph Jonathan Fernandes",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Joseph Jonathan Fernandes | Systems & AI Software Engineer",
    description: "From production AUTOSAR ECU modules to real-time ISL recognition. Systems & AI Software Engineer from GEC Goa.",
    url: "https://jjf-eight.vercel.app",
    siteName: "Joseph Jonathan Fernandes Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Jonathan Fernandes | Systems & AI Software Engineer",
    description: "From production AUTOSAR ECU modules to real-time ISL recognition. Systems & AI Software Engineer from GEC Goa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
