import CategoryPreview from "@/components/CategoryPreview";
import { getCategories } from "@/utils/supabase/queries";

const CategoriesPage = async () => {
  const { data, error } = await getCategories();

  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-center font-bold py-4 text-3xl">Categories</h2>
      <div className="w-full lg:w-100">
        <div className="flex flex-col w-full gap-4">
          {data &&
            data.map((item, index) => {
              return <CategoryPreview key={index} category={item} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;
