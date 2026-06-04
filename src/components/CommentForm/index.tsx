import { createComment } from "@/actions/create-comment";
import { editComment } from "@/actions/edit-comment";
import { commentSchema } from "@/actions/schemas";
import { UserCommentType } from "@/utils/supabase/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SmallButton from "../SmallButton";

type CommentFormProps = {
  postId: number;
  commentToEdit?: UserCommentType;
  parentId?: string | null;
  closeFormFunction: () => void;
  title: string;
};

const CommentForm = ({
  postId,
  commentToEdit,
  parentId,
  closeFormFunction,
  title,
}: CommentFormProps) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: commentToEdit ? commentToEdit.text : "",
    },
  });

  const authorId = commentToEdit ? commentToEdit.parent_user : "";
  const commentId = commentToEdit ? commentToEdit?.id : "";

  const { mutate, error } = commentToEdit
    ? useMutation({
        mutationFn: editComment,
        onMutate: () => {
          (toast("Editing comment..."), closeFormFunction());
        },
        onSettled: () => toast.success("Edit successful!"),
      })
    : useMutation({
        mutationFn: createComment,
        onMutate: () => {
          (toast("Creating comment..."), closeFormFunction());
        },
        onSettled: () => toast.success("Comment created!"),
      });

  return (
    <form
      className={`mt-2 bg-white ${commentToEdit ? "border-none" : "border-rose-500 border-3"}  rounded-lg`}
      onSubmit={handleSubmit((values) => {
        mutate({
          postId,
          userdata: {
            comment: values.comment,
          },
          parentId,
          authorId,
          commentId,
        });
      })}
    >
      {" "}
      {!commentToEdit ? (
        <>
          {" "}
          <h3 className="font-bold p-2 text-white text-2xl text-center bg-gradient-to-b to-rose-500 from-red-500">
            {title}
          </h3>
          <div className="p-3 flex flex-col justify-center items-center gap-3">
            <fieldset className="flex flex-col w-full gap-1">
              <label htmlFor="comment">Type here:</label>
              <textarea
                id="comment"
                className="resize-none rounded-xs bg-gray-100"
                rows={5}
                {...register("comment")}
              />
            </fieldset>
            <div className="flex gap-2">
              <div
                className="bg-gradient-to-b from-gray-700 to-stone-700 text-white py-1.5 
                       px-3 font-semibold rounded-2xl text-lg cursor-pointer w-fit"
                onClick={closeFormFunction}
              >
                Close
              </div>
              <button
                className="bg-gradient-to-b from-red-500 to-rose-500 text-white py-1.5 
                       px-3 font-semibold rounded-2xl text-lg cursor-pointer w-fit"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <fieldset>
            <textarea
              id="comment"
              className="resize-vertical w-full text-lg my-2 rounded-xs bg-gray-100"
              rows={2}
              {...register("comment")}
            />
          </fieldset>
          <div className="pb-2 flex justify-center">
            <SmallButton color="red" text="Submit" />
          </div>
        </>
      )}
    </form>
  );
};

export default CommentForm;
