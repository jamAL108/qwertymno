import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner"




export const metadata: Metadata = {
  title: "Jamal Mydeen",
  description: "Blog site",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/bloglogo.png',
        href: '/images/bloglogo.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/bloglogo.png',
        href: '/images/bloglogo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
