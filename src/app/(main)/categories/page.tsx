import { slugify } from "@/utils/slugify"
import { getCategories } from "@/utils/supabase/queries"

const CategoriesPage = async () => {
    const {data, error} = await getCategories()
    console.log(data)

    return (
        <section>
            <div className="flex gap-2">
                {data && data.map((category, index) => {
                    return <div key={index}><a href={`categories/${category.id}/${slugify(category.category_name)}`}>{category.category_name}</a></div>
                })}
            </div>
        </section>
    )
}

export default CategoriesPage