import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect } from 'react'
import Nav from "@/components/nav";
import { ArrowUpRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import Data from '@/lib/data'
import { formatDate } from '@/utils'
import { getAllBlogs } from '@/api';
import Landing from '@/components/landing';


const SearchTabsLayout = ({blogData}:any) => {
  const [searchQuery, setSearchQuery] = useState('');

//   const tabsData = [
//     {
//       value: "overview",
//       title: "Overview",
//       content: "This is the overview section content. Here you can display summary information."
//     },
//     {
//       value: "analytics",
//       title: "Analytics",
//       content: "Analytics section with charts and data visualization would go here."
//     },
//     {
//       value: "reports",
//       title: "Reports",
//       content: "Reports section showing various types of reports and documents."
//     },
//     {
//       value: "settings",
//       title: "Settings",
//       content: "Settings section for configuring preferences and options."
//     }
//   ];

  return (
    <div className="w-full mx-auto base:p-4 bl:p-6 space-y-6">
      {/* Search Section */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 max-w-xl"
        />
      </div>

      {/* Tabs Section */}
      <Card className='border-none'>
      <CardContent className="p-0 border-none">
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="flex items-end justify-start w-full h-12 p-0 rounded-none rounded-t-2 overflow-x-auto whitespace-nowrap scrollbar-hide snap-x snap-mandatory">
              {blogData?.map((category:any) => (
                <TabsTrigger 
                  key={category.title} 
                  value={category.title}
                  className=" !min-w-[140px] w-auto px-4 py-2 text-sm h-full font-medium relative transition-all
                    data-[state=active]:text-blue-600 
                    data-[state=active]:bg-transparent
                    hover:text-blue-600
                    rounded-none
                    data-[state=active]:border-b-2 
                    data-[state=active]:border-blue-500
                    !shadow-none
                    focus:none"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {blogData.map((category:any) => (
              <TabsContent 
              
                key={category.title} 
                value={category.title}
                className="bl:p-6 base:py-6 focus:outline-none"
              >
                <div className='w-full h-auto flex flex-wrap
                   base:gap-x-[20px] bl:gap-x-[45px] !gap-y-[40px] base:justify-center base:px-5 tablet:px-0 tablet:justify-start items-start'>
                {category.blogs.map((data:any,index:number)=>(
                    <Link href={`/blog/${data.URL_prefix + '-' + data.id}`} key={index} className='base:w-full tablet:w-[330px] bl:w-[360px] cursor-pointer flex flex-col transform hover:scale-[1.02] duration-500 ease-in-out'>
                    <img src={data.coverImage} className="w-full base:h-[210px] bl:h-[220px]" alt='vef' />
                    <Card className="border-none px-0">
                        <CardHeader className="gap-1 px-0">
                        <p className="text-blue-600 text-sm">{formatDate(data.created_at)}</p>
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
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchTabsLayout;