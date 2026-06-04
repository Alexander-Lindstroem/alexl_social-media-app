import { getCategories } from "@/utils/supabase/queries"
import CategoryPreview from "../CategoryPreview"
import SeeMore from "../SeeMore"

const HomeCategories = async () => {
    const {data, error} = await getCategories(10)

    return (
        <section className="flex flex-col items-center gap-4 grow py-2">
            <h2 className="font-semibold text-4xl text-center py-2">Categories</h2>
            {data && 
            data.map((item, index) => {
                return <CategoryPreview key={index} category={item}/>
            })}
            <SeeMore linkTo={"categories"}/>
        </section>
    )
}

export default HomeCategories