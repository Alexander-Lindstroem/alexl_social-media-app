'use client'
import { editPost } from "@/actions/edit-post"
import { postSchema } from "@/actions/schemas"
import { Tables } from "@/utils/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const EditForm = ({postId, defaultValues}: {postId: number, defaultValues: Pick<Tables<'posts'>, "title" | "content" | "image">}) => {
    const postWithImageSchema = postSchema
        .omit({image: true})
        .extend({ image: z.unknown().transform(value => {return value as (FileList)}).optional() })
    
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(postWithImageSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined,
            image: defaultValues.image
        }
    })

    const {mutate, error} = useMutation({
        mutationFn: editPost,
        onMutate: () => toast("Editing post..."),
        onSettled: () => toast.success("Edit done!")
    })
    
    return (
        <form 
            className="flex p-4 flex-col w-[700px] mx-auto"
            onSubmit={handleSubmit(values => {
                let imageForm = undefined
                
                if (values.image?.length && typeof values.image !== "string") {
                    imageForm = new FormData()
                    imageForm.append('image', values.image[0])
                }

                mutate({
                    postId,
                    userdata:
                    {
                        title: values.title,
                        content: values.content,
                        image: imageForm
                    }
                })
            })} 
        >
            <fieldset>
                <label htmlFor="title">Post title</label>
                <input 
                    id="title" 
                    {...register('title')}
                />
            </fieldset>
            <fieldset>
                {defaultValues.image && <img src={defaultValues.image} alt="post image" />}
                <label htmlFor="title">Upload a new image for your post</label>
                <input
                    type="file"
                    id="image" 
                    {...register('image')}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="content">Post content</label>
                <textarea 
                    className="ml-2 mb-4 px-2 border-1 rounded-xl w-full" 
                    id="content" 
                    placeholder="Enter what you want to say..."
                    {...register('content')}
                />
            </fieldset>
            <button className="button-tertiary">Update post!</button>
        </form>
    )
}

export default EditForm