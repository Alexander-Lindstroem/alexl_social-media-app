"use client";
import { editPost } from "@/actions/edit-post";
import { postSchema } from "@/actions/schemas";
import { Tables } from "@/utils/supabase/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const EditForm = ({
  postId,
  defaultValues,
  username,
}: {
  postId: number;
  username: string;
  defaultValues: Pick<
    Tables<"posts">,
    "title" | "content" | "image" | "category"
  >;
}) => {
  const postWithImageSchema = postSchema.omit({ image: true }).extend({
    image: z
      .unknown()
      .transform((value) => {
        return value as FileList;
      })
      .optional(),
  });
  const supabasePublicUrl =
    "https://jowykinxaspmomugfzvt.supabase.co/storage/v1/object/public";

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(postWithImageSchema),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content || undefined,
      image: defaultValues.image,
      category: defaultValues.category,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: editPost,
    onMutate: () => toast("Editing post..."),
    onSettled: () => toast.success("Edit done!"),
  });

  return (
    <div className="mt-2 border-3 border-rose-500 rounded-lg w-full flex flex-col">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((values) => {
          let imageForm = undefined;

          if (values.image?.length && typeof values.image !== "string") {
            imageForm = new FormData();
            imageForm.append("image", values.image[0]);
          }

          mutate({
            postId,
            userdata: {
              category: values.category,
              title: values.title,
              content: values.content,
              image: imageForm,
            },
          });
        })}
      >
        <input
          id="title"
          {...register("title")}
          className="font-bold p-2 text-white text-2xl text-center bg-gradient-to-b to-rose-500 from-red-500"
        />
        <h3 className="text-sm p-2 text-right ">
          Submitted by <span className="font-bold">{username}</span>
        </h3>
        <fieldset className="w-full bg-gray-50">
          {defaultValues.image ? (
            <div className="relative w-fit h-fit">
              <div className="text-center absolute text-lg p-4 bg-black/40 rounded-xl text-white text-shadow-[black_2px_2px_2px] cursor-pointer bottom-1/2 right-1/2 translate-1/2">
                <label htmlFor="image" className="cursor-pointer">
                  Upload a new image for your post
                </label>
                <input
                  type="file"
                  id="image"
                  className="cursor-pointer text-center text-shadow-[black_2px_2px_2px]"
                  {...register("image")}
                />
              </div>
              <img
                src={`${supabasePublicUrl}/${defaultValues.image}`}
                alt="post image"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center p-2 text-center">
              <label htmlFor="image" className="cursor-pointer w-fit">
                Upload an image for your post?
              </label>
              <input
                type="file"
                id="image"
                className="bg-gray-100 m-1 rounded-md file:bg-gradient-to-b
                        file:from-red-400 file:to-rose-400 file:rounded-md p-1 file:p-1 file:text-white
                        file:font-semibold text-gray-500 file:pr-2 cursor-pointer max-w-[512px]"
                {...register("image")}
              />
            </div>
          )}
        </fieldset>
        <fieldset>
          <textarea
            className="bg-gray-50 text-lg w-full p-4"
            id="content"
            rows={5}
            placeholder="Enter what you want to say..."
            {...register("content")}
          />
        </fieldset>
        <div className="p-2 flex justify-center">
          <button
            className="bg-gradient-to-b from-red-500 to-rose-500 text-white py-1.5 
      px-3 font-semibold rounded-2xl text-lg cursor-pointer"
          >
            Update post!
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
