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
  title: "Joseph Jonathan Fernandes | Embedded-first Software Engineer",
  description: "Final-year CE student, AI/ML Honors. Embedded systems intern at Visteon with PPO. Built ISL recognition (98.3% acc) & CmdBridge. 70+ public repos.",
  keywords: ["Joseph Jonathan Fernandes", "Software Engineer", "Embedded Systems", "AI/ML", "Full-Stack Developer", "Visteon", "NASA Space Apps", "GEC Goa"],
  authors: [{ name: "Joseph Jonathan Fernandes" }],
  creator: "Joseph Jonathan Fernandes",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Joseph Jonathan Fernandes | Embedded-first Software Engineer",
    description: "From production AUTOSAR ECU modules to real-time ISL recognition. CE student, Visteon intern, 70+ public repos.",
    url: "https://jjf-eight.vercel.app",
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
