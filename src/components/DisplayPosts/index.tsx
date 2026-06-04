import { HomePostType } from "@/utils/supabase/queries"
import PostPreview from "../PostPreview"

const DisplayPosts = ({title, postData}:{title:string, postData:HomePostType}) => {
    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <h2 className="capitalize font-semibold text-4xl text-center py-2">{title}</h2>
            {postData.map(({id, title, slug, users, categories}) => (
            <PostPreview key={id} title={title} author={users.username} link={slug} category={categories.category_name}/>
            ))}
        </div>
    )
}

export default DisplayPosts