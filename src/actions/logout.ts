'use server'
import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"

export const logout = async () => {
    const supabase = await createClient()
    supabase.auth.signOut()

    redirect("/")
}