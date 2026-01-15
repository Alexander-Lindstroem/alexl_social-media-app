'use client'
import CommentForm from "@/components/CommentForm"
import { useState } from "react"

const AddCommentButton = ({parentPost}:{parentPost:number}) => {
    const [showCommentWindow, setShowCommentWindow] = useState<boolean>(false)

    const handleClick = () => {
        setShowCommentWindow(!showCommentWindow)
    }

    return (
        <div className="flex flex-col justify-center gap-4 bg-gray-100 p-8">
            <p>Click the button below to join the conversation!</p>
            {!showCommentWindow ? 
            <button onClick={handleClick} className="button-tertiary">Add comment</button>
            :
            <div>
                <CommentForm postId={parentPost} parentId={null} closeFormFunction={handleClick}/>
            </div>
            }
        </div>
    )
}

export default AddCommentButton