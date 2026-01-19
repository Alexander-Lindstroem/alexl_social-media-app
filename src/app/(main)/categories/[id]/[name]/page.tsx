import PostPreview from "@/components/PostPreview"
import { getCategoryPosts } from "@/utils/supabase/queries"

const SingleCategoryPage = async ({params}:{params:{name:string, id:string}}) => {
    const {name, id} = await params
    const parsedId = parseInt(id)

    const {data, error} = await getCategoryPosts(parsedId)

    console.log(data)
    return (
        <div>
            <h2>{name}</h2>
            {data && data.map((post, index) => {
                return <PostPreview key={index} title={post.title} author={post.users.username} link={post.slug}/>
            })}
        </div>
    )
}

export default SingleCategoryPage