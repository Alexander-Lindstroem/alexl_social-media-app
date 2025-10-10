import { createClient } from "./browser-client"
import { type QueryData } from "@supabase/supabase-js"

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase
        .from('posts')
        .select('id, title, slug, users("username")')
        .order('created_at', {ascending: false})
}

export const getSinglePosts = async (slug: string) => {
    const supabase = createClient()

    return await supabase
        .from('posts')
        .select('id, user_id, title, image, content, users("username")')
        .eq('slug', slug)
        .single()
}

export const getSearchedPosts = async (searchTerm: string) => {
    const supabase = createClient()

    return await supabase
        .from('posts')
        .select('title, slug')
        .ilike('title', `${searchTerm}%`)
}


export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>