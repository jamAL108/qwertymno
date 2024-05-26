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
import { formatDate, formatNumber, timeAgo } from '@/utils'
import SkeletonComp from './skeleton';
import { getBlog, addComment } from '@/api';
import BlogNotFound from '@/components/blogNotFound'
import { Eye } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label';
import { FaCircleUser } from "react-icons/fa6";
import { Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { Share2 } from 'lucide-react';

const Slug = () => {
    const [content, setcontent] = useState<any>(null);
    const [error, setError] = useState<boolean>(false)
    const [info, setinfo] = useState<any>(null);
    const [comment, setComment] = useState<string>('')

    const [commentPush, setCommentPush] = useState<boolean>(false)

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

    const addCommentFunction = async () => {
        let comments = info.comments
        setCommentPush(true)
        const newComment = {
            comment,
            date: new Date()
        }
        if (comments === null) {
            comments = []
            comments.push(newComment)
        } else {
            comments.unshift(newComment)
        }
        console.log(comments)
        const result: any = await addComment(info.id, comments)
        if (result.success === false) {
            console.log("MEOW")
            setComment('')
            setCommentPush(false)
        } else if (result.success === true) {
            let temp = { ...info }
            temp.comments = comments;
            console.log(temp)
            setinfo(temp)
            setComment('')
            setCommentPush(false)
        }
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
                                <div className='w-full flex items-center justify-between gap-10'>
                                    <div className='flex items-center gap-10'>
                                        <p className="text-[#6941C6] text-sm">{info ? formatDate(info.created_at) : ''}</p>
                                        <p className='flex items-center text-sm justify-center gap-1'><Eye className='text-muted-foreground h-5 w-5' /> {formatNumber(info.views + 1)}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className='rounded-full min-h-[50px]'
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(`https://qwertymno.vercel.app/blog/${info.URL_prefix + '-' + info.id}`);
                                            toast("Blog Link Copied", {
                                                description: "Share knowledge with your friends",
                                            })
                                        }
                                        }
                                    >
                                        <Share2 className='h-5 w-5 text-foreground' />
                                    </Button>
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
                            <div className='w-full flex items-center gap-7 mt-[30px]'>
                                {info !== null && info.categories.map((badge: string, id: number) => (
                                    <Badge className='px-6 py-2.5 text-lg' key={id}>{badge}</Badge>
                                ))}
                            </div>
                            <div className='w-full base:px-0 bl:px-5 py-2 flex flex-col gap-5 mt-[20px]'>
                                <div className='w-full flex flex-col gap-3'>
                                    <TextareaAutosize placeholder='Add a Comment..' value={comment} onChange={(e) => setComment(e.target.value)} className='w-full !resize-none text-lg bg-transparent font-500 break-words outline-none  placeholder:opacity-[0.6] border-b-2 pb-2' />
                                    {comment.length !== 0 && commentPush === false && (
                                        <div className='w-full flex justify-end items-center gap-3'>
                                            <Button onClick={(e) => setComment('')} className='px-6 py-3 rounded-[40px]' variant="outline">Cancel</Button>
                                            <Button onClick={(e) => {
                                                addCommentFunction()
                                            }} className='px-6 py-3 rounded-[40px]'>Comment</Button>
                                        </div>
                                    )}
                                    {commentPush === true && (
                                        <div className='w-full flex justify-center items-center'>
                                            <Loader2 className="h-6 w-6 animate-spin text-foreground" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {info.comments === null ? (
                                        <Label className='py-2 text-muted-foreground'>No comments Added Yet</Label>
                                    ) : info.comments.length !== 0 && (
                                        <div className='w-full flex flex-col gap-7 mt-[20px]'>
                                            {info.comments.map((comm: any, idxx: number) => (
                                                <div key={idxx} className='flex gap-3 w-full'>
                                                    <FaCircleUser className='h-9 w-9 text-foreground' />
                                                    <div className='flex flex-1 flex-col gap-1'>
                                                        <div className='w-full flex items-center gap-3'>
                                                            <p className='text-xs'>Unknown Person</p>
                                                            <p className='text-xs text-muted-foreground'> {timeAgo(comm.date)}</p>
                                                        </div>
                                                        <h2 className='w-full text-sm max-w-[90%]'>
                                                            {comm.comment}
                                                        </h2>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Slug