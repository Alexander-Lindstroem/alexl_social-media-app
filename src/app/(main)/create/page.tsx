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
        queryFn: () => getCategories(),
    })

    const categoryVisibility = categories?.data?.map(item => item.visible) ?? []

    const postWithImageSchema = postSchema
        .omit({image: true})
        .extend({
            image: z.unknown().transform(value => {return value as (FileList)}).optional(),
            category: z.number().refine(
                (status) => categoryVisibility.includes(false),
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
        <div className="mt-2 border-3 border-rose-500 rounded-lg grow max-w-[1024px] flex flex-col">
            <h2 className="font-bold p-2 text-white text-2xl text-center bg-gradient-to-b to-rose-500 from-red-500">Create Post</h2>
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
                className="flex p-4 flex-col mx-auto">
                <fieldset className="flex flex-col mb-2">
                    <label htmlFor="category" className="font-semibold">Category</label>
                    <select 
                        {...register("category", {valueAsNumber: true})}
                        id="category"
                        className="capitalize bg-gray-100 p-2 m-1 rounded-md focus:shadow-[inset_0_0_0_2px_theme(colors.rose.300)]"
                    >
                        <option className="text-gray-500" value="">Click to select</option>
                        {categories?.data?.filter((category) => category.visible === true).
                            map((category, index) => {
                            return <option key={index} value={category.id}>{category.category_name}</option>
                        })}
                    </select>
                    {errors.category && <ErrorMessage message={errors.category.message!}/>}
                </fieldset>
                <fieldset className="flex flex-col mb-2">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <input 
                        {...register("title")} 
                        id="title" 
                        placeholder="Enter the title of your post..."
                        autoComplete="off"
                        className="p-2 m-1 rounded-md bg-gray-100 focus:shadow-[inset_0_0_0_2px_theme(colors.rose.300)] focus:outline-hidden"
                    />
                    {errors.title && <ErrorMessage message={errors.title.message!}/>}
                </fieldset>
                <fieldset className="flex flex-col mb-2">
                    <label htmlFor="content" className="font-semibold">Content</label>
                    <textarea 
                        {...register("content")} 
                        className="p-2 m-1 rounded-md bg-gray-100 focus:outline-hidden focus:shadow-[inset_0_0_0_2px_theme(colors.rose.300)] resize-none" 
                        id="content" 
                        placeholder="Enter what you want to say..."
                    />
                    {errors.content && <ErrorMessage message={errors.content.message!}/>}
                </fieldset>
                <fieldset className="flex flex-col mb-4">
                    <label htmlFor="image" className="font-semibold">Image</label>
                    <input 
                        {...register("image")} 
                        type="file"
                        id="image"
                        placeholder="Pick an image..."
                        className="bg-gray-100 m-1 rounded-md file:bg-gradient-to-b
                        file:from-red-400 file:to-rose-400 file:rounded-md p-1 file:p-1 file:text-white
                        file:font-semibold text-gray-500 file:pr-2"
                    />
                    {errors.image && <ErrorMessage message={errors.image.message!} />}
                </fieldset>
                <button className="border-3 bg-gradient-to-b from-red-500 to-rose-500 text-white
                 rounded-lg text-lg font-bold w-full max-w-[200px] p-2 self-center"
                 >
                    Create Post
                </button>
            </form>
        </div>
    )
}

export default CreatePage