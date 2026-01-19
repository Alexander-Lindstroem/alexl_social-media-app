import { createClient } from "./browser-client"
import { type QueryData } from "@supabase/supabase-js"

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase
        .from('posts')
        .select('id, title, slug, users("username"), categories("category_name")')
        .order('created_at', {ascending: false})
        .limit(20)
}

export const getSinglePosts = async (slug: string) => {
    const supabase = createClient()

    return await supabase
        .from('posts')
        .select('id, user_id, title, image, content, category, users("username")')
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

export const getComments = async (postId:number) => {
    const supabase = createClient()
    
    return await supabase
        .from('comments')
        .select('id, created_at, text, parent_user, parent_post, parent_comment, is_deleted, users("username")')
        .eq('parent_post', postId)
        .order("created_at", {ascending: false})
}

export const getCategories = async () => {
    const supabase = createClient()

    return await supabase
        .from("categories")
        .select("id, category_name, visible")
        .order("id")
}

export const getCategoryPosts = async (categoryId:number) => {
    const supabase = createClient()

    return await supabase
        .from("posts")
        .select('id, title, slug, category("category_name"), users("username")')
        .eq("category", categoryId)
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>> 

//Kind of annoying to have to use the [0] here at the end, 
//but it has to a be a single object for my code to work, 
//rather than an array, and this is the only way I know how to do it.
export type UserCommentType = QueryData<ReturnType<typeof getComments>>[0]

export type UserCommentWithChildrenType = UserCommentType & {
    children: UserCommentWithChildrenType[]
}