"use client";
import CommentForm from "@/components/CommentForm";
import { useState } from "react";

const AddCommentButton = ({ parentPost }: { parentPost: number }) => {
  const [showCommentWindow, setShowCommentWindow] = useState<boolean>(false);

  const handleClick = () => {
    setShowCommentWindow(!showCommentWindow);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-4 rounded-md bg-gray-100 p-8">
      <p className="text-lg md:text-xl text-center">
        Click the button below to join the conversation!
      </p>
      {!showCommentWindow ? (
        <button
          onClick={handleClick}
          className="bg-gradient-to-b from-red-500 to-rose-500 text-white py-1.5 
                     px-3 font-semibold rounded-2xl text-lg cursor-pointer w-fit"
        >
          Add comment
        </button>
      ) : (
        <div className="w-full md:max-w-[512px]">
          <CommentForm
            title="Create Comment"
            postId={parentPost}
            parentId={null}
            closeFormFunction={() => setShowCommentWindow(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AddCommentButton;
