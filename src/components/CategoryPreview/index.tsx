import { slugify } from "@/utils/slugify";
import { CategoryType } from "@/utils/supabase/queries";
import Link from "next/link";

type CategoryPreviewProps = {
  category: CategoryType;
};

const CategoryPreview = ({ category }: CategoryPreviewProps) => {
  return (
    <Link
      href={`categories/${category.id}/${slugify(category.category_name)}`}
      className="shadow-sm bg-gradient-to-b from-red-500 to-rose-500 w-full max-w-[640px] rounded-md py-2 px-4"
    >
      <h2 className="font-bold text-white text-center text-xl capitalize">
        {category.category_name}
      </h2>
    </Link>
  );
};

export default CategoryPreview;
