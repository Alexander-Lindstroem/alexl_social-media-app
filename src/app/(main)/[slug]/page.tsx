import { getSinglePosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import AddCommentButton from "./AddCommentButton";
import CommentSection from "./CommentSection";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const { data, error } = await getSinglePosts(slug);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user?.id === data?.user_id ? true : false;

  const supabasePublicUrl =
    "https://jowykinxaspmomugfzvt.supabase.co/storage/v1/object/public";

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center max-w-[1024px] grow">
        {data && (
          <div className="mt-2 border-3 border-rose-500 rounded-lg w-full flex flex-col">
            <h2 className="font-bold p-2 text-white text-2xl text-center bg-gradient-to-b to-rose-500 from-red-500">
              {data.title}
            </h2>
            <h3 className="text-sm p-2 text-right ">
              Submitted by{" "}
              <span className="font-bold">{data.users.username}</span>
            </h3>
            <div className="rounded-md bg-gray-50">
              {data.image && (
                <a href={`${supabasePublicUrl}/${data.image}`}>
                  <img
                    src={`${supabasePublicUrl}/${data.image}`}
                    alt={data.image}
                    className="max-w-[90sw] md:max-w-fit"
                  />
                </a>
              )}
              <p className="p-4 text-lg">{data.content}</p>
            </div>
            {isAuthor && (
              <div className="flex gap-2 justify-start p-2">
                <DeleteButton postId={data.id} />
                <EditButton slug={slug} />
              </div>
            )}
          </div>
        )}
        {data && user && <AddCommentButton parentPost={data.id} />}
        {data && (
          <CommentSection
            currentUser={user}
            parentPost={data.id}
            isPostAuthor={isAuthor}
          />
        )}
      </div>
    </>
  );
};

export default SinglePost;
