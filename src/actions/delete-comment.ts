'use server'

import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type deleteCommentProps = {
    postId: number,
    commentId: string,
    authorId: string,
    isPostAuthor: boolean,
}

export const deleteComment = async ({postId, commentId, authorId, isPostAuthor}:deleteCommentProps) => {
    const supabase = await createClient();
    const {data: {user}, error} = await supabase.auth.getUser();

    if(!user || user.id != authorId && isPostAuthor) {throw new Error("Not authorized")}

    await supabase
        .from("comments")
        .update({"is_deleted": true})
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