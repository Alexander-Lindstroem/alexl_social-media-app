'use server'

import z from "zod"
import { commentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type EditCommentProps = {
    postId: number,
    userdata: z.infer<typeof commentSchema>,
    authorId: string,
    commentId: string
}

export const editComment = async ({postId, userdata, authorId, commentId}:EditCommentProps) => {
    const parsedData = commentSchema.parse(userdata)

    const supabase = await createClient();
    const {data: {user}, error} = await supabase.auth.getUser();
    if(!user || user.id != authorId) {throw new Error("Not authorized")}

    await supabase
        .from("comments")
        .update({"text": parsedData.comment})
        .eq("id", commentId)
        .throwOnError()

    const {data: updatedPost} =
    await supabase
        .from("posts")
        .select("slug")
        .eq("id", postId)
        .single()
        .throwOnError()

    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)
}