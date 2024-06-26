import React from 'react'
import Image from 'next/image'
import { ModeToggle } from './themetoggle'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

const Nav: React.FC<any> = (props) => {
  const { blog } = props;
  const { theme, setTheme } = useTheme()
  return (
    <div className='w-full flex justify-between items-center px-6 base:py-7 bl:py-5'>
      <div className='flex items-center gap-2 justify-center'>
        <Link href={'/'} className='text-[1.2rem] font-[500]'>Jamal Mydeen</Link>
      </div>
      <div className='bl:flex base:hidden items-center justify-center gap-9'>
        <Link href='/'>Blog</Link>
        <Link href='/'>Projects</Link>
        <Link href='https://github.com/jamAL108'>Github</Link>
        {
          blog === true && <ModeToggle />
        }
      </div>
      <Sheet>
        <SheetTrigger className='bl:hidden base:flex'><Menu className='text-foregroud h-7 w-7' /></SheetTrigger>
        <SheetContent side="left" className="flex flex-col z-[1000000]">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              Jamal Mydeen
              <span className="sr-only">Jamal Mydeen</span>
            </Link>
            <Link
              href="/"
              className="mx-[-0.65rem] mt-[20px] text-sm flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href='/'
              className="mx-[-0.65rem] flex text-sm items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href='https://github.com/jamAL108'
              className="mx-[-0.65rem] flex text-sm items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Github
            </Link>
            {blog === true &&
              <div className="flex items-center border-2 rounded-md w-full px-4 py-4 justify-between my-4">
                <Label htmlFor="airplane-mode">Dark Mode</Label>
                <Switch id="airplane-mode" checked={theme === 'dark'} onCheckedChange={(e) => {
                  if (e === true) {
                    setTheme('dark')
                  } else {
                    setTheme('light')
                  }
                }} />
              </div>
            }
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Nav