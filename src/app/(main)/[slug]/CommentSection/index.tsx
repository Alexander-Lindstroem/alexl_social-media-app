import { getComments } from "@/utils/supabase/queries";
import { buildCommentTree } from "@/utils/buildCommentTree";
import UserComment from "@/components/UserComment";
import { User } from "@supabase/supabase-js";

type CommentSectionProps = {
  currentUser: User | null;
  parentPost: number;
  isPostAuthor: boolean;
};

const CommentSection = async ({
  currentUser,
  parentPost,
  isPostAuthor,
}: CommentSectionProps) => {
  const { data, error } = await getComments(parentPost);
  const dataWithChildren = buildCommentTree(data!);

  return (
    <div className="w-full">
      {data && data.length > 0 ? (
        <div className="w-full">
          {dataWithChildren &&
            dataWithChildren.map((item, index) => {
              return (
                <UserComment
                  isRootComment={true}
                  key={index}
                  comment={item}
                  currentUser={currentUser}
                  isPostAuthor={isPostAuthor}
                />
              );
            })}
        </div>
      ) : (
        <div>There are no comments!</div>
      )}
    </div>
  );
};

export default CommentSection;
