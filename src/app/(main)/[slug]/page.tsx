import { getSinglePosts } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

const SinglePost = async ({params}:{params:{slug:string}}) => {
    const {slug} = await params

    const {data, error} = await getSinglePosts(slug)
    
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

    const isAuthor = user?.id === data?.user_id ? true : false

    const supabasePublicUrl = "https://jowykinxaspmomugfzvt.supabase.co/storage/v1/object/public"

    return (
        <div className="p-4 flex flex-col border-1 rounded-2xl gap-2">
            {data && 
            <>
                <h2 className="text-left text-2xl capitalize">{data.title}</h2>
                <h3 className="text-lg">Submitted by <span className="font-bold">{data.users.username}</span></h3>
                <div className="border-1 border-gray-500 rounded-md">
                    {data.image && <img src={`${supabasePublicUrl}/${data.image}`} alt={data.image} />}
                    <p className="p-2">{data.content}</p>
                </div>
                {isAuthor && 
                <div className="flex gap-2">
                    <DeleteButton postId={data.id}/>
                    <EditButton slug={slug}/>
                </div>
                }
            </>
            }
        </div>
    )
}

export default SinglePost