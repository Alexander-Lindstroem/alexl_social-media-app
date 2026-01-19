'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";

export const createPost = async (userdata: z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(userdata)

    const imageFile = userdata.image?.get('image')

    if (!(imageFile instanceof File) && imageFile !== null) {
        throw new Error("Malformed image file")
    }

    const imagePublicUrl = imageFile ? await uploadImage(imageFile) : null

    const supabase = await createClient();
    const {data: {user}, error} = await supabase.auth.getUser();
    if(!user) {throw new Error("Not authorized")}

    const slug = slugify(parsedData.title)
    const userId = user.id

    await supabase
        .from("posts")
        .insert([{
            user_id: userId,
            slug: slug,
            title: parsedData.title,
            content: parsedData.content,
            image: imagePublicUrl,
            category: parsedData.category
        }])
        .throwOnError()
    
    revalidatePath("/")
    redirect(`/${slug}`)
}