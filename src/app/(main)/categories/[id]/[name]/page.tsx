import DisplayPosts from "@/components/DisplayPosts"
import { getPosts } from "@/utils/supabase/queries"

const SingleCategoryPage = async ({params}:{params:{name:string, id:string}}) => {
    const {name, id} = await params
    const parsedId = parseInt(id)

    const {data, error} = id === "1" ? await getPosts() : await getPosts({categoryId: parsedId})

    return (
        <section className="grow">
            {data && <DisplayPosts title={name} postData={data}/>}
        </section>
    )
}

export default SingleCategoryPage