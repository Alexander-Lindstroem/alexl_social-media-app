import { getPosts } from "@/utils/supabase/queries"
import SeeMore from "../SeeMore"
import DisplayPosts from "../DisplayPosts"

const HomePosts = async () => {
    const {data, error} = await getPosts({limit: 10})

    return (
        <section className="flex flex-col items-center gap-4 grow md:grow-2 py-2">
            {data && <DisplayPosts title={"Latest Posts"} postData={data}/>}
            <SeeMore linkTo={"categories/1/all"}/>
        </section>
    )
}

export default HomePosts