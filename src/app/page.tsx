'use client'
import { useState } from 'react'
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

const blogs = [
  {
    title: "Getting Started with React Hooks",
    date: "2024-05-24",
    description: "Learn the basics of React Hooks and how to use them effectively in your projects.",
    image: "https://example.com/react-hooks.png"
  },
  {
    title: "10 Tips for Writing Clean TypeScript Code",
    date: "2024-05-18",
    description: "Discover best practices for writing clean and maintainable TypeScript code.",
    image: "https://example.com/typescript-tips.png"
  },
  {
    title: "Introduction to GraphQL with Apollo Client",
    date: "2024-05-10",
    description: "Explore the fundamentals of GraphQL and how to integrate it with Apollo Client in your React applications.",
    image: "https://example.com/graphql-apollo.png"
  },
  {
    title: "Getting Started with React Hooks",
    date: "2024-05-24",
    description: "Learn the basics of React Hooks and how to use them effectively in your projects.",
    image: "https://example.com/react-hooks.png"
  },
  {
    title: "10 Tips for Writing Clean TypeScript Code",
    date: "2024-05-18",
    description: "Discover best practices for writing clean and maintainable TypeScript code.",
    image: "https://example.com/typescript-tips.png"
  },
  {
    title: "Introduction to GraphQL with Apollo Client",
    date: "2024-05-10",
    description: "Explore the fundamentals of GraphQL and how to integrate it with Apollo Client in your React applications.",
    image: "https://example.com/graphql-apollo.png"
  }
];


export default function Home() {
  let itemsPageArray = [10, 20, 30]
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPageArray[0])
  const [page, setPage] = useState<number>(1)
  const [totalpage, setTotalPage] = useState<number>(blogs.length)



  const handlePrev = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  const handleNext = () => {
    if (page !== totalpage) {
      setPage(page + 1);
    }
  }
  return (
    <div className="flex-1 min-h-[100vh] flex justify-center">
      <div className="w-[min(1350px,90vw)] flex flex-col">
        <Nav />
        <div className="w-full py-3 flex justify-center items-center border-t-2 border-b-2">

        </div>
        <div className="w-full flex flex-col gap-7 px-5 py-3">
          <h1 className="font-semibold text-lg">Featured blog posts</h1>
          <div className="w-full flex base:gap-5 bl:gap-12 base:flex-col bl:flex-row justify-center">
            <div className="base:w-full bl:w-[45%] flex flex-col">
              <img src='/images/dummy1.png' className="w-full base:h-[190px] bl:h-[210px]" alt='vef' />
              <Card className="border-none px-0">
                <CardHeader className="px-0 gap-1">
                  <p className="text-[#6941C6]">Sunday , 1 Jan 2023</p>
                  <CardTitle className="flex items-center justify-between">UX review presentations <ArrowUpRight className="h-8 w-8 text-foreground" /></CardTitle>
                  <CardDescription className="!mr-[70px]">How do you create compelling presentations that wow your colleagues
                    and impress your managers?</CardDescription>
                  <div className="flex items-center gap-4 py-2">
                    <Badge>Design</Badge>
                    <Badge>Research</Badge>
                    <Badge>Badge</Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="base:w-full bl:w-[45%] flex flex-col gap-3 ">
              <div className="w-full flex base:flex-col tablet:flex-row gap-2">
                <img src='/images/dummy2.png' className="base:w-full tablet:w-[50%] h-[185px]" alt='vef' />
                <Card className="border-none base:pt-4 tablet:pt-0 base:px-0 tablet:px-3">
                  <CardHeader className="gap-1 pt-0 base:px-0 tablet:px-3">
                    <p className="text-[#6941C6] text-sm">Sunday , 1 Jan 2023</p>
                    <CardTitle className="text-xl">Migration to vim</CardTitle>
                    <CardDescription>How do you create compelling presentations that wow your colleagues
                      and impress your managers?</CardDescription>
                    <div className="flex items-center gap-4 py-2">
                      <Badge>Design</Badge>
                      <Badge>Research</Badge>
                    </div>
                  </CardHeader>
                </Card>
              </div>
              <div className="w-full flex base:flex-col tablet:flex-row gap-2">
                <img src='/images/dummy2.png' className="base:w-full tablet:w-[50%] h-[185px]" alt='vef' />
                <Card className="border-none base:pt-4 tablet:pt-0 base:px-0 tablet:px-3">
                  <CardHeader className="gap-1 pt-0 base:px-0 tablet:px-3">
                    <p className="text-[#6941C6] text-sm" >Sunday , 1 Jan 2023</p>
                    <CardTitle className="text-xl">Migration to vim</CardTitle>
                    <CardDescription>The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manag...</CardDescription>
                    <div className="flex items-center gap-4 py-2">
                      <Badge>Design</Badge>
                      <Badge>Research</Badge>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>




          <div className="w-full flex base:flex-col bl:flex-row base:gap-5 bl:gap-12 justify-center">
            <img src='/images/dummy3.png' alt='asdv' className="base:w-full bl:w-[45%] base:h-[190px] bl:h-[210px]" />
            <Card className="border-none pt-0 px-0 base:w-full bl:w-[45%]">
              <CardHeader className="pt-0 gap-1 px-0">
                <p className="text-[#6941C6]">Sunday , 1 Jan 2023</p>
                <CardTitle className="flex items-center justify-between">UX review presentations <ArrowUpRight className="h-8 w-8 text-foreground" /></CardTitle>
                <CardDescription className="tablet:mr-[70px]">A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.</CardDescription>
                <div className="flex items-center gap-4 py-2">
                  <Badge>Design</Badge>
                  <Badge>Research</Badge>
                  <Badge>Badge</Badge>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>


        <div className="w-full flex flex-col gap-10 bl:px-5 my-20 mb-[100px]">
          <h1 className="font-semibold text-lg">All blog posts</h1>
          <div className='w-full h-auto flex flex-wrap
          base:gap-x-[20px] bl:gap-x-[45px] !gap-y-[40px] base:justify-center tablet:justify-start items-start'>
            {Data.map((data: any, index: number) => (
              <Link href={`/blog/${data.URL}`} key={index} className='base:w-[330px] bl:w-[360px] cursor-pointer flex flex-col'>
                <img src={data.coverImage} className="w-full base:h-[220px] bl:h-[220px]" alt='vef' />
                <Card className="border-none px-0">
                  <CardHeader className="gap-1 px-0">
                    <p className="text-[#6941C6] text-sm">{formatDate(data.date)}</p>
                    <CardTitle className="text-xl">{data.title}</CardTitle>
                    <CardDescription>{data.excerts}</CardDescription>
                    <div className="flex items-center gap-4 py-2">
                      {data.categories.map((badge: string, id: number) => (
                        <Badge key={id}>{badge}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
