import { createClient } from "./browser-client"
import { type QueryData } from "@supabase/supabase-js"

type GetPostsOptions = {
    limit?:number, 
    categoryId?:number
}

export const getPosts = async ({limit, categoryId}: GetPostsOptions = {}) => {
    const supabase = createClient()

    let query = supabase
        .from('posts')
        .select('id, title, slug, users("username"), categories("category_name")')
        .order('created_at', {ascending: false})
    if (categoryId) { query = query
        .eq("category", categoryId)}
    if (limit) { query = query
        .limit(limit)}
    
    return await query
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

export const getCategories = async (limit?:number) => {
    const supabase = createClient()

    let query = supabase
        .from("categories")
        .select("id, category_name, visible")
        .order("id")
    if (limit) {query = query
        .limit(limit)}
    
    return await query
}

export type HomePostType = QueryData<ReturnType<typeof getPosts>> 

//Kind of annoying to have to use the [0] here at the end, 
//but it has to a be a single object for my code to work, 
//rather than an array, and this is the only way I know how to do it.
export type UserCommentType = QueryData<ReturnType<typeof getComments>>[0]

export type UserCommentWithChildrenType = UserCommentType & {
    children: UserCommentWithChildrenType[]
}

export type CategoryType = QueryData<ReturnType<typeof getCategories>>[0]