import createSupabaseServerClient from '@/lib/supabaseServer'

export const getBlogMetadata = async (id: any) => {
    try {
        const supabase = await createSupabaseServerClient();
        let { data: blogs, error }: any = await supabase
            .from('qwertymno_blogs')
            .select('*')
            .eq('id', id)
        if (error !== null) return { success: false }
        if (blogs.length !== 0) {
            return { success: true, data: blogs[0] }
        }
        return { success: false }
    } catch (error) {
        return { success: false }
    }
}


