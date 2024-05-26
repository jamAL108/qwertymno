'use client';
import React, { useEffect, useState } from 'react'
import Data from '@/lib/data'
import { fetchAndStoreDataFromGitHubFolder, markdownToHtml } from '@/utils'
import { useParams } from 'next/navigation';
import './blog.css';
import Nav from "@/components/nav";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowUpRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate , formatNumber } from '@/utils'
import SkeletonComp from './skeleton';
import { getBlog } from '@/api';
import BlogNotFound from '@/components/blogNotFound'
import { Eye } from 'lucide-react';

const Slug = () => {
    const [content, setcontent] = useState<any>(null);
    const [error, setError] = useState<boolean>(false)
    const [info, setinfo] = useState<any>(null);

    const [otherBlog, setOtherBlog] = useState<any>(null)
    const params: any = useParams<{ url: string; }>()
    useEffect(() => {
        let PATH: any = params.url
        const uuidExtracted = extractUUID(PATH)
        getBlogFunction(uuidExtracted)
    }, [])

    function extractUUID(input: string): string | null {
        const regex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
        const match = input.match(regex);
        return match ? match[0] : null;
    }

    async function getBlogFunction(id: any) {
        const result = await getBlog(id)
        if (result.success === false) {
            setError(true)
        } else {
            setinfo(result.data)
            setOtherBlog(result.others)
            func(result.data)
        }
    }

    const func = async (matchingObject: any) => {
        if (Object.keys(matchingObject).length !== 0) {
            const temp = await fetchAndStoreDataFromGitHubFolder(matchingObject.github);
            const cont = await markdownToHtml(temp || "");
            setcontent(cont);
        }
    }

    useEffect(() => {
        console.log(content);
        // eslint-disable-next-line
    }, [content])


    if (error) {
        return <BlogNotFound />
    }

    return (
        <div className="flex-1 flex justify-center overflow-y-hidden">
            <div className="w-[min(1350px,90vw)] flex flex-col overflow-y-hidden">
                <div className='w-[min(1350px,90vw)] z-[10000] fixed top-0 bg-background'>
                    <Nav />
                </div>
                {content === null ? (
                    <SkeletonComp />
                ) : (
                    <div className='w-full flex gap-10 mt-[80px] relative overflow-y-hidden'>
                        <div className='w-[min(420px,28%)] base:hidden bl:flex fixed top-20'>
                            <ScrollArea className="w-[95%] max-h-[calc(100vh_-_140px)] flex-col px-5 my-12 mb-[100px]">
                                <h1 className="font-semibold text-xl">Recent blog posts</h1>
                                <div className='w-full flex flex-col gap-5 mt-[40px]'>
                                    {otherBlog !== null && otherBlog.map((blog: any, index: number) => {
                                        if (blog.id !== info.id) {
                                            return (
                                                <Link href={`/blog/${blog.URL_prefix + '-' + blog.id}`} key={index} className='w-[360px] cursor-pointer flex flex-col'>
                                                    <img src={blog.coverImage} className="w-full h-[220px]" alt='vef' />
                                                    <Card className="border-none px-0">
                                                        <CardHeader className="gap-1 px-0">
                                                            <p className="text-[#6941C6] text-sm">{formatDate(blog.created_at)}</p>
                                                            <CardTitle className="text-xl">{blog.title}</CardTitle>
                                                            <CardDescription>{blog.excerts}</CardDescription>
                                                            <div className="flex items-center gap-4 py-2">
                                                                {blog.categories.map((badge: string, id: number) => (
                                                                    <Badge key={id}>{badge}</Badge>
                                                                ))}
                                                            </div>
                                                        </CardHeader>
                                                    </Card>
                                                </Link>
                                            )
                                        }
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                        <div className='w-full flex flex-col gap-10 bl:ml-[33%] my-14 base:px-4 bl:px-0'>
                            <div className='flex w-full flex-col gap-5'>
                                <div className='w-full flex items-center gap-10'>
                                    <p className="text-[#6941C6] text-sm">{info ? formatDate(info.created_at) : ''}</p>
                                    <p className='flex items-center text-sm justify-center gap-1'><Eye className='text-muted-foreground h-5 w-5' /> {formatNumber(info.views + 1)}</p>
                                </div>
                                <h1 className='text-3xl bl:w-[80%] font-bold'>{info ? info.title : ''}</h1>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <img src={info ? info.coverImage : ''} alt="dwef" className='base:w-full bl:w-[55%] base:h-[220px] bl:h-[300px] border-2 rounded-md' />
                            </div>
                            <div
                                className="markdown max-w-[900px] text-foreground  !w-full"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                            <div className='w-full flex items-center gap-7 mt-[50px]'>
                                {info !== null && info.categories.map((badge: string, id: number) => (
                                    <Badge className='px-6 py-2.5 text-lg' key={id}>{badge}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Slug