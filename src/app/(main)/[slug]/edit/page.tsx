import { getSinglePosts } from "@/utils/supabase/queries"
import EditForm from "./EditForm"

const EditPage = async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const {data, error} = await getSinglePosts(slug)

    return (
        <div>
            {data &&
                <EditForm postId={data.id} defaultValues={{title: data.title, content: data.content, image: data.image, category: data.category}}/>
            }
        </div>
    )
}

export default EditPage