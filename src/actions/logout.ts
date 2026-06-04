'use server'
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const logout = async () => {
    const supabase = await createClient()
    await supabase.auth.signOut()

    revalidatePath("/", "layout")
    redirect("/")
}