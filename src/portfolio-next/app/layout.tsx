import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joseph-fernandes.vercel.app'),
  title: "Joseph Jonathan Fernandes | Embedded-first Software Engineer",
  description: "Final-year CE student at GEC Goa, AI/ML Honors, CGPA 9.778. Embedded systems intern at Visteon with accepted PPO. ISL recognition at 98.33% accuracy. 70+ public repos.",
  keywords: ["Joseph Jonathan Fernandes", "Software Engineer", "Embedded Systems", "AI/ML", "Full-Stack Developer", "Visteon", "NASA Space Apps", "GEC Goa"],
  authors: [{ name: "Joseph Jonathan Fernandes" }],
  creator: "Joseph Jonathan Fernandes",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Joseph Jonathan Fernandes | Embedded-first Software Engineer",
    description: "From production AUTOSAR ECU modules to real-time ISL recognition. CE student, Visteon intern, 70+ public repos.",
    url: "https://joseph-fernandes.vercel.app",
    siteName: "Joseph Jonathan Fernandes Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Jonathan Fernandes | Embedded-first Software Engineer",
    description: "From production AUTOSAR ECU modules to real-time ISL recognition.",
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
