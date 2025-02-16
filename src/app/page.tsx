'use client'
import { useEffect, useState } from 'react'
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
import Data from '@/lib/data'
import { formatDate } from '@/utils'
import { getAllBlogs } from '@/api';
import SkeletonComp from './skeleton';
import Landing from '@/components/landing';

export default function Home() {
  const [blogData, setBlogData] = useState<any>(null)
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    getblogFunction()
  }, [])

  const getblogFunction = async () => {
    const result: any = await getAllBlogs()
    console.log(result)
    if (result.success === false) {
      setLoader(false)
    } else {
      let blogs = [...result.data]
      setBlogData(segregateArray(blogs))
      setLoader(false)
    }
  }

  interface SegregatedObject {
    title: string;
    blogs: any[];
}

function segregateArray(data: any[]): SegregatedObject[] {
    const resultMap: { [key: string]: any[] } = {};
    
    data.forEach(item => {
        if (!resultMap[item.category]) {
            resultMap[item.category] = [];
        }
        resultMap[item.category].push(item);
    });
    console.log(resultMap)
    
    const result: SegregatedObject[] = Object.keys(resultMap).map(category => ({
        title: category,
        blogs: resultMap[category]
    }));

    result.sort((a, b) => b.blogs.length - a.blogs.length);
    
    const featuredItems = data.filter(item => item.features);
    if (featuredItems.length > 0) {
        result.unshift({ title: "featured", blogs: featuredItems });
    }
    
    return result;
}





  return (
    <div className="flex-1 min-h-[100vh] flex justify-center">
      <div className="w-[min(1350px,100vw)]  flex flex-col">
        <Nav blog={true} />

        {loader === false && (
          <Landing blogData={blogData} />
        )}
      </div>
    </div>
  );
}
