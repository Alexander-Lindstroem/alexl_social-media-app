'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { loginSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"

export const login = async (userdata:z.infer<typeof loginSchema>) => {
    const parsedData = loginSchema.parse(userdata)

    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.signInWithPassword(parsedData)

    if (error) return {error: error.message}

    revalidatePath("/", "layout")
    redirect("/")
}