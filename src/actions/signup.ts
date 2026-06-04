'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import z from "zod"
import { signupSchema } from "./schemas"
import { revalidatePath } from "next/cache"

export const signup = async (userdata:z.infer<typeof signupSchema>) => {
    const parsedData = signupSchema.parse(userdata)

    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.signUp(parsedData)
    
    if(user && user.email) {
        const{data, error} = await supabase
            .from("users")
            .insert([{
                id: user.id, 
                email: user.email, 
                username: parsedData.username
            }])
    }

    if (error) return {error: error.message}

    revalidatePath("/", "layout")
    redirect("/")
}

