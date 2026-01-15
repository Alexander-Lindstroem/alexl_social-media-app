'use server'

import z from "zod"
import { commentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

type CreateCommentProps = {
    postId:number, 
    userdata:z.infer<typeof commentSchema>, 
    parentId?: string | null
}

export const createComment = async ({postId, userdata, parentId = null}:CreateCommentProps) => {
    const parsedData = commentSchema.parse(userdata)

    const supabase = await createClient();
    const {data: {user}, error} = await supabase.auth.getUser();
    if(!user) {throw new Error("Not authorized")}

    const userId = user.id

    await supabase
        .from("comments")
        .insert([{
            parent_post: postId,
            parent_user: userId,
            parent_comment: parentId,
            text: parsedData.comment,
        }])
        .throwOnError()

    const {data: updatedPost} =
    await supabase
        .from("posts")
        .select("slug")
        .eq("id", postId)
        .single()
        .throwOnError()

    if (error) throw error
    
    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)
}