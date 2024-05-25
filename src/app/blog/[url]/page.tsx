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
import { formatDate } from '@/utils'
import SkeletonComp from './skeleton';

const Slug = () => {
    const [content, setcontent] = useState<any>(null);
    const [info, setinfo] = useState<any>(null);
    const params: any = useParams<{ url: string; }>()
    useEffect(() => {
        let PATH: any = params.url
        if (PATH !== '') {
            let matchingObject = Data.find(obj => obj.github.includes(PATH));
            setinfo(matchingObject);
            func(matchingObject)
        }
    }, [])

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
                        <div className='w-[min(400px,28%)] base:hidden bl:flex fixed top-20'>
                            <ScrollArea className="w-[95%] max-h-[calc(100vh_-_140px)] flex-col px-5 my-12 mb-[100px]">
                                <h1 className="font-semibold text-xl">Recent blog posts</h1>
                                <div className='w-full flex flex-col gap-5 mt-[40px]'>
                                    {[0, 0, 0, 0, 0, 0, 0,].map((client: any, index: number) => (
                                        <Link href={`/home/clients/${client}`} key={index} className='w-[360px] cursor-pointer flex flex-col'>
                                            <img src='/images/dummy4.png' className="w-full h-[220px]" alt='vef' />
                                            <Card className="border-none px-0">
                                                <CardHeader className="gap-1 px-0">
                                                    <p className="text-[#6941C6] text-sm">Sunday , 1 Jan 2023</p>
                                                    <CardTitle className="text-xl">Bill Walsh leadership lessons</CardTitle>
                                                    <CardDescription>Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?</CardDescription>
                                                    <div className="flex items-center gap-4 py-2">
                                                        <Badge>Design</Badge>
                                                        <Badge>Research</Badge>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                        <div className='w-full flex flex-col gap-10 bl:ml-[33%] my-14 base:px-4 bl:px-0'>
                            <div className='flex w-full flex-col gap-5'>
                                <p className="text-[#6941C6] text-sm">{info ? formatDate(info.date) : ''}</p>
                                <h1 className='text-3xl bl:w-[80%] font-bold'>{info ? info.title : ''}</h1>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <img src={info ? info.coverImage : ''} alt="dwef" className='base:w-full bl:w-[55%] base:h-[220px] bl:h-[300px]' />
                            </div>
                            <div
                                className="markdown max-w-[900px] text-foreground  !w-full"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Slug