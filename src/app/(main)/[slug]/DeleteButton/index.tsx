"use client";
import { deletePost } from "@/actions/delete-post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteButton = ({ postId }: { postId: number }) => {
  const { mutate, error } = useMutation({
    mutationFn: deletePost,
    onMutate: () => toast("Deleting your post..."),
    onSettled: () => toast.success("Post deleted!"),
  });
  return (
    <button
      onClick={() => mutate(postId)}
      className="bg-gradient-to-b from-gray-700 to-stone-700 text-white py-1.5 px-3 
                 font-semibold rounded-2xl text-lg cursor-pointer"
    >
      Delete post
    </button>
  );
};

export default DeleteButton;
