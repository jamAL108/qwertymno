'use client'
import { createBrowserClient } from '@supabase/ssr'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const getAllBlogs = async () => {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
        const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
        let { data: qwertymno_blogs, error } = await supabase
            .from('qwertymno_blogs')
            .select('*')
        if (error !== null) return { success: false }
        return { success: true, data: qwertymno_blogs }
    } catch (error) {
        return { success: false }
    }
}


export const getBlog = async (id: any) => {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
        const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
        let { data: blogs, error }: any = await supabase
            .from('qwertymno_blogs')
            .select('*')
            .eq('id', id)
        if (error !== null) return { success: false }
        if (blogs.length !== 0) {
            const { data, error } = await supabase
                .from('qwertymno_blogs')
                .update({ views: blogs[0].views + 1 })
                .eq('id', id)
                .select()

            let { data: OtherBlogs, error: OtherError }: any = await supabase
                .from('qwertymno_blogs')
                .select('*')
                .range(0, 5)
            return { success: true, data: blogs[0], others: OtherBlogs }
        }
        return { success: false }
    } catch (error) {
        return { success: false }
    }
}

export const getBlogMetadata = async (id: any) => {
    try {
        const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
        let { data: blogs, error }: any = await supabase
            .from('qwertymno_blogs')
            .select('*')
            .eq('id', id)
            console.log(blogs)
        if (error !== null) return { success: false }
        if (blogs.length !== 0) {
            return { success: true, data: blogs[0]}
        }
        return { success: false }
    } catch (error) {
        return { success: false }
    }
}


export const addComment = async (id: string, comments: string) => {
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
        .from('qwertymno_blogs')
        .update({ comments: comments })
        .eq('id', id)
        .select()
    console.log(error)
    if (error !== null) {
        return { success: false }
    }
    return { success: true }
}