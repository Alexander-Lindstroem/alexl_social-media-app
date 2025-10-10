'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const deletePost = async (postId : number) => {
    const supabase = await createClient()
    await supabase
        .from("posts")
        .delete()
        .eq('id', postId)
        .throwOnError()

    revalidatePath("/")
    redirect("/")
}