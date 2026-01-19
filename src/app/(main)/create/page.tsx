'use client'
import { createPost } from "@/actions/create-post"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { postSchema } from "@/actions/schemas"
import { getCategories } from "@/utils/supabase/queries"

const CreatePage = () => {
    const {data:categories} = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    const categoryIds = categories?.data?.map(item => item.id) ?? []

    const postWithImageSchema = postSchema
        .omit({image: true})
        .extend({
            image: z.unknown().transform(value => {return value as (FileList)}).optional(),
            category: z.number().refine(
                (id) => categoryIds.includes(id),
                {message: "You must select a valid category"}
            )
        })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(postWithImageSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: createPost,
        onMutate: () => toast("Creating post..."),
        onSettled: () => toast.success("Post created!")
    })

    return (
        <div className="form-wrapper">
            <h2 className="font-bold text-2xl">Create post!</h2>
            <form 
                onSubmit={handleSubmit(values => {
                    const imageForm = new FormData();
                    if (values.image?.length) {imageForm.append('image', values.image[0])}
                    mutate({
                        title: values.title,
                        content: values.content,
                        image: imageForm,
                        category: values.category
                    })
                })} 
                className="flex p-4 flex-col w-[700px] mx-auto">
                <fieldset>
                    <label htmlFor="category">Post category</label>
                    <select 
                        {...register("category", {valueAsNumber: true})}
                        id="category"
                        className="capitalize"
                    >
                        <option className="text-gray-500" value="">Select</option>
                        {categories?.data?.map((category, index) => {
                            return <option key={index} value={category.id}>{category.category_name}</option>
                        })}
                    </select>

                    {errors.category && <ErrorMessage message={errors.category.message!}/>}
                </fieldset>
                <fieldset>
                    <label htmlFor="title">Post title</label>
                    <input 
                        {...register("title")} 
                        id="title" 
                        placeholder="Enter the title of your post..."
                    />
                    {errors.title && <ErrorMessage message={errors.title.message!}/>}
                </fieldset>
                <fieldset>
                    <label htmlFor="content">Post content</label>
                    <textarea 
                        {...register("content")} 
                        className="ml-2 mb-4 px-2 border-1 rounded-xl w-full" 
                        id="content" 
                        placeholder="Enter what you want to say..."
                    />
                    {errors.content && <ErrorMessage message={errors.content.message!}/>}
                </fieldset>
                <fieldset>
                    <label htmlFor="image">Upload image</label>
                    <input 
                        {...register("image")} 
                        type="file"
                        id="image"
                        placeholder="Pick an image..."
                    />
                    {errors.image && <ErrorMessage message={errors.image.message!} />}
                </fieldset>
                <button className="button-secondary">Create Post</button>
            </form>
        </div>
    )
}

export default CreatePage