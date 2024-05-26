import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from 'next/link'

const sessionNotFound = () => {
    return (
        <AlertDialog open={true}>
            <AlertDialogContent className='w-[min(400px,90vw)] !rounded-[13px]'>
                <AlertDialogHeader>
                    <AlertDialogTitle>The particular blog not found</AlertDialogTitle>
                    <AlertDialogDescription>
                        <h2>There may be some mistake in the URL , or the blog doesnt exists</h2>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex base:flex-row  base:justify-end'>
                    <Link href={'/'} className='px-[18px] py-[7px] rounded-[6px] text-white bg-primary hover:bg-primary/90'>Go to Home</Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default sessionNotFound