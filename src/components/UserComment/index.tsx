'use client'
import { UserCommentWithChildrenType } from "@/utils/supabase/queries"
import { User } from "@supabase/supabase-js"
import { useState } from "react"
import CommentForm from "../CommentForm"
import { deleteComment } from "@/actions/delete-comment"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import ConfirmChoiceWindow from "../ConfirmChoiceWindow"

type UserCommentProps = {
    comment:UserCommentWithChildrenType,
    currentUser:User | null,
    isPostAuthor:boolean
}

const UserComment = ({comment, currentUser, isPostAuthor}:UserCommentProps) => {
    const [showComment, setShowComment] = useState<Boolean>(true)
    const handleShowComment = () => {
        setShowComment(!showComment)
    }

    const [showThread, setShowThread] = useState<Boolean>(true)
    const handleShowThread = () => {
        setShowThread(!showThread)
        if (!showComment) {
            setShowComment(true)
        }
    }

    const [showReplyWindow, setShowReplyWindow] = useState<boolean>(false)
    const handleShowReplyWindow = () => {
        setShowReplyWindow(!showReplyWindow)
    }

    const [showEditWindow, setShowEditWindow] = useState<boolean>(false)
    const handleShowEditWindow = () => {
        setShowEditWindow(!showEditWindow)
    }

    const [showDeleteWindow, setShowDeleteWindow] = useState<boolean>(false)
    const handleShowDeleteWindow = () => {
        setShowDeleteWindow(!showDeleteWindow)
    }
    const {mutate, error} = useMutation({
    mutationFn: deleteComment,
    onMutate: () => {toast("Deleting...")},
    onSettled: () => toast.success("Deleted!")
    })
    const handleConfirmDelete = () => {
        mutate({
            postId: comment.parent_post,
            commentId: comment.id,
            authorId: comment.parent_user,
            isPostAuthor: isPostAuthor
        })
    }

    const isAuthor = currentUser?.id === comment.parent_user ? true : false
 
    return (
        <div id="nesting-point" className="border-1 p-2">
            {comment.children.length > 0 && <button onClick={handleShowThread}>close</button>}
            {showThread && <>
            <div id="comment-content" className="p-4">
                {!comment.is_deleted ?
                <>
                <button className="cursor-pointer" onClick={handleShowComment}>close</button>
                {showComment &&
                <div>
                    <p>{comment.created_at}</p>
                    <p>{comment.users.username}</p>
                    {showEditWindow 
                    ? <CommentForm postId={comment.parent_post} commentToEdit={comment} closeFormFunction={handleShowEditWindow}/> 
                    : <p>{comment.text}</p>}
                    <div className="flex gap-2">
                        {isAuthor && <button onClick={handleShowEditWindow}>Edit</button>}
                        {(isAuthor || isPostAuthor) && <button onClick={handleShowDeleteWindow}>Delete</button>}
                        {currentUser && <button onClick={handleShowReplyWindow}>Reply</button>}
                    </div>
                    {showReplyWindow &&
                    <div>
                        <CommentForm postId={comment.parent_post} parentId={comment.id} closeFormFunction={handleShowReplyWindow}/>
                    </div>
                    }
                    {showDeleteWindow &&
                        <ConfirmChoiceWindow 
                            windowText="Are you sure you want to delete this comment?"
                            confirmChoice={handleConfirmDelete}
                            closeWindow={handleShowDeleteWindow}
                        />
                    }
                </div>
                }
                </>
                : <div>deleted message</div>}
            </div>
            {comment.children && comment.children.length > 0 && (
                <div id="reply" className="">
                    {comment.children.map((comment, index) => (
                        <UserComment key={index} comment={comment} currentUser={currentUser} isPostAuthor={isPostAuthor}/>
                    ))}
                </div>
            )}
            </>}
        </div>
    )
}

export default UserComment