"use client";
import { UserCommentWithChildrenType } from "@/utils/supabase/queries";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import CommentForm from "../CommentForm";
import { deleteComment } from "@/actions/delete-comment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ConfirmChoiceWindow from "../ConfirmChoiceWindow";
import { usePopupContext } from "@/providers/popup-context-provider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SmallButton from "../SmallButton";
dayjs.extend(relativeTime);

type UserCommentProps = {
  comment: UserCommentWithChildrenType;
  currentUser: User | null;
  isPostAuthor: boolean;
  isRootComment?: boolean;
};

const UserComment = ({
  comment,
  currentUser,
  isPostAuthor,
  isRootComment = false,
}: UserCommentProps) => {
  const { popupWindow, setPopupWindow } = usePopupContext();

  const [showComment, setShowComment] = useState<Boolean>(true);
  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const [showThread, setShowThread] = useState<Boolean>(true);
  const handleShowThread = () => {
    setShowThread(!showThread);
    if (!showComment) {
      setShowComment(true);
    }
  };

  const [showReplyWindow, setShowReplyWindow] = useState<boolean>(false);
  const handleShowReplyWindow = () => {
    setShowReplyWindow(!showReplyWindow);
  };

  const [showEditWindow, setShowEditWindow] = useState<boolean>(false);
  const handleShowEditWindow = () => {
    setShowEditWindow(!showEditWindow);
  };
  const { mutate, error } = useMutation({
    mutationFn: deleteComment,
    onMutate: () => {
      toast("Deleting...");
    },
    onSettled: () => {
      toast.success("Deleted!");
      setPopupWindow(null);
    },
  });
  const handleConfirmDelete = () => {
    mutate({
      postId: comment.parent_post,
      commentId: comment.id,
      authorId: comment.parent_user,
      isPostAuthor: isPostAuthor,
    });
  };

  const isAuthor = currentUser?.id === comment.parent_user ? true : false;

  const timestamp = new Date(comment.created_at);
  const timeAgo = dayjs(timestamp).fromNow();

  return (
    <div id="nesting-point" className="">
      <div
        id="comment-container"
        className="p-4 border-2 rounded-2xl flex flex-col justify-center border-rose-500 relative mt-2"
      >
        {!isRootComment && (
          <div
            id="thread-connector"
            className="border-rose-500 border-l-2 rounded-b-full h-1/2 top-0 w-9 absolute left-0 -translate-x-1/2"
          />
        )}
        {!comment.is_deleted ? (
          <div id="comment-content">
            <div className="flex justify-between">
              {showComment && (
                <div className="flex gap-1">
                  <p className="font-bold">{comment.users.username}</p>
                  <p className="opacity-50">{timeAgo}</p>
                </div>
              )}
              <button
                className="cursor-pointer select-none border-2 w-6 h-6 relative border-rose-500 rounded-lg text-left"
                onClick={handleShowComment}
              >
                {showComment ? (
                  <span className="cursor-events-none text-rose-500 font-bold text-2xl absolute bottom-1/2 right-1/2 translate-1/2 pb-[4.6px] rotate-45">
                    +
                  </span>
                ) : (
                  <span className="cursor-events-none text-rose-500 font-bold text-2xl absolute bottom-1/2 right-1/2 translate-1/2 pb-[5.8px]">
                    -
                  </span>
                )}
              </button>
            </div>
            {showComment && (
              <div>
                {showEditWindow ? (
                  <CommentForm
                    title="Edit Comment"
                    postId={comment.parent_post}
                    commentToEdit={comment}
                    closeFormFunction={handleShowEditWindow}
                  />
                ) : (
                  <p className="py-2 text-lg">{comment.text}</p>
                )}
                <div className="flex gap-1">
                  {isAuthor && (
                    <SmallButton
                      color={`${showEditWindow ? "gray" : "red"}`}
                      text={`${showEditWindow ? "Close" : "Edit"}`}
                      onClick={handleShowEditWindow}
                    />
                  )}
                  {(isAuthor || isPostAuthor) && (
                    <SmallButton
                      text="Delete"
                      color="gray"
                      onClick={() =>
                        setPopupWindow(
                          <ConfirmChoiceWindow
                            windowText="Are you sure you want to delete this comment?"
                            confirmChoice={handleConfirmDelete}
                          />,
                        )
                      }
                    />
                  )}
                  {currentUser && (
                    <SmallButton
                      color="red"
                      text="Reply"
                      onClick={handleShowReplyWindow}
                    />
                  )}
                </div>
                {showReplyWindow && (
                  <div>
                    <CommentForm
                      title="Post Reply"
                      postId={comment.parent_post}
                      parentId={comment.id}
                      closeFormFunction={handleShowReplyWindow}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="capitalize font-semibold opacity-50 text-lg">
            deleted message
          </div>
        )}
      </div>
      <div id="replies-and-thread-container" className="flex">
        {comment.children.length > 0 && (
          <div
            id="thread-indicator"
            className="basis-8 relative cursor-pointer z-200"
            onClick={handleShowThread}
          >
            <div
              className="border-l-2 rounded-b-full border-rose-500 w-full absolute left-1/2"
              style={{ height: "calc(100% - 30px)" }}
            />
          </div>
        )}
        <div className="grow">
          {showThread && (
            <>
              {comment.children && comment.children.length > 0 && (
                <div id="replies" className={`flex flex-col gap-2`}>
                  {comment.children.map((comment, index) => (
                    <UserComment
                      key={index}
                      comment={comment}
                      currentUser={currentUser}
                      isPostAuthor={isPostAuthor}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          {comment.children && comment.children.length > 0 && (
            <div
              className="m-2 p-2 text-lg font-semibold cursor-pointer"
              onClick={handleShowThread}
              id="show-and-close"
            >
              {showThread ? (
                <p>Close {comment.children.length} Replies</p>
              ) : (
                <p>Show {comment.children.length} Replies</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserComment;
