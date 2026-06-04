import { getSinglePosts } from "@/utils/supabase/queries";
import EditForm from "./EditForm";

const EditPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { data, error } = await getSinglePosts(slug);

  return (
    <div className="flex flex-col gap-4 justify-center items-center max-w-[1024px] grow">
      {data && (
        <EditForm
          postId={data.id}
          username={data.users.username}
          defaultValues={{
            title: data.title,
            content: data.content,
            image: data.image,
            category: data.category,
          }}
        />
      )}
    </div>
  );
};

export default EditPage;
