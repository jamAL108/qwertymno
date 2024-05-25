import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const SkeletonComp = () => {
    return (
        <div className='w-full flex gap-10 mt-[80px] relative overflow-y-hidden'>
            <div className='w-[min(400px,28%)] base:hidden bl:flex fixed top-20'>
                <div className="w-[95%] max-h-[calc(100vh_-_140px)] flex-col px-5 my-12 mb-[100px]">
                    <Skeleton className='w-[220px] h-[25px]' />
                    <div className='w-full flex flex-col gap-5 mt-[40px]'>
                        {[0, 0, 0].map((client: any, index: number) => (
                            <div key={index} className='w-[360px] cursor-pointer flex flex-col'>
                                <Skeleton className='w-full h-[220px]' />
                                <Card className="border-none px-0">
                                    <CardHeader className="gap-1 px-0">
                                        <Skeleton className='w-[140px] h-[10px]' />
                                        <Skeleton className='w-[90%] h-[30px]' />
                                        <Skeleton className='w-[100%] h-[10px]' />
                                        <Skeleton className='w-[30%] h-[10px]' />
                                    </CardHeader>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col gap-10 bl:ml-[33%] my-14 base:px-5 bl:px-0'>
                <div className='flex w-full flex-col gap-5'>
                    <Skeleton className='w-[150px] h-[12px]' />
                    <Skeleton className='w-[90%] h-[26px]' />
                    <Skeleton className='w-[88%] h-[26px] mt-[-9px]' />
                </div>
                <div className='w-full flex justify-center items-center'>
                    <Skeleton className='base:w-full bl:w-[55%] base:h-[220px] bl:h-[300px]' />
                </div>
                <div className='w-full flex flex-col gap-3 mt-[70px]'>
                    <Skeleton className='w-[93%] h-[12px]' />
                    <Skeleton className='w-[95%] h-[12px]' />
                    <Skeleton className='w-[86%] h-[12px]' />
                </div>
            </div>
        </div>
    )
}

export default SkeletonComp