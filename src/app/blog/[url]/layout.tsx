import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/app/globals.css";
import { getBlogMetadata } from '@/api/serverComp'
import { extractUUID } from '@/utils'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({ subsets: ["latin"] });


type Props = {
    params: { url: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const id = params.url;
    const blogId = extractUUID(id)

    // fetch data
    const result: any = await getBlogMetadata(blogId);
    if (result.success === false) {
        return {
            title: "Invalid Blog URL",
            description: "The url is invalid and corrupted",
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
    } else {
        return {
            title: result.data.title,
            description: result.data.excerts,
            icons: {
                icon: [
                    {
                        media: '(prefers-color-scheme: light)',
                        url: result.data.coverImage,
                        href: result.data.coverImage,
                    },
                    {
                        media: '(prefers-color-scheme: dark)',
                        url: result.data.coverImage,
                        href: result.data.coverImage,
                    },
                ],
            },
        };
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                    {children}
            </body>
        </html>
    );
}