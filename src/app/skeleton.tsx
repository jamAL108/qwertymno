import React from 'react'
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
import Data from '@/lib/data'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonComp = () => {
    return (
        <>
            <div className="w-full flex flex-col gap-7 px-5 py-3">
                <Skeleton className='w-[220px] h-[28px]' />
                <div className="w-full flex base:gap-5 bl:gap-12 base:flex-col bl:flex-row justify-center">
                    <div className="base:w-full bl:w-[45%] flex flex-col">
                        <Skeleton className='w-full base:h-[190px] bl:h-[210px]' />
                        <Card className="border-none px-0">
                            <CardHeader className="px-0 gap-1">
                                <Skeleton className='w-[140px] h-[10px]' />
                                <Skeleton className='w-[90%] h-[30px]' />
                                <Skeleton className='w-[100%] h-[10px]' />
                                <Skeleton className='w-[30%] h-[10px]' />
                                <div className="flex items-center gap-4 py-2">
                                    <Skeleton className='w-[60px] h-[18px]' />
                                    <Skeleton className='w-[60px] h-[18px]' />
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="base:w-full bl:w-[45%] flex flex-col gap-10 ">
                        <div className="w-full flex base:flex-col tablet:flex-row gap-2">
                            <Skeleton className='base:w-full tablet:w-[50%] h-[185px]' />
                            <Card className="border-none base:pt-4 tablet:pt-0 base:px-0 tablet:px-3">
                                <CardHeader className="gap-1 pt-0 base:px-0 tablet:px-3">
                                    <Skeleton className='w-[140px] h-[10px]' />
                                    <Skeleton className='w-[230px] h-[30px]' />
                                    <Skeleton className='w-[95%] h-[10px]' />
                                    <Skeleton className='w-[91%] h-[10px]' />
                                    <Skeleton className='w-[30%] h-[10px]' />
                                    <div className="flex items-center gap-4 py-2">
                                        <Skeleton className='w-[60px] h-[18px]' />
                                        <Skeleton className='w-[60px] h-[18px]' />
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                        <div className="w-full flex base:flex-col tablet:flex-row gap-2">
                            <Skeleton className='base:w-full tablet:w-[50%] h-[185px]' />
                            <Card className="border-none base:pt-4 tablet:pt-0 base:px-0 tablet:px-3">
                                <CardHeader className="gap-1 pt-0 base:px-0 tablet:px-3">
                                    <Skeleton className='w-[140px] h-[10px]' />
                                    <Skeleton className='w-[230px] h-[30px]' />
                                    <Skeleton className='w-[95%] h-[10px]' />
                                    <Skeleton className='w-[91%] h-[10px]' />
                                    <Skeleton className='w-[30%] h-[10px]' />
                                    <div className="flex items-center gap-4 py-2">
                                        <Skeleton className='w-[60px] h-[18px]' />
                                        <Skeleton className='w-[60px] h-[18px]' />
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkeletonComp