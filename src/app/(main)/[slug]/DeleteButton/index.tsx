'use client'
import { deletePost } from "@/actions/delete-post"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({postId}: {postId: number}) => {
    const {mutate, error} = useMutation({
        mutationFn: deletePost,
        onMutate: () => toast("Deleting your post..."),
        onSettled: () => toast.success("Post deleted!")
    })
    return <button onClick={() => mutate(postId)} className="button-tertiary">Delete post</button>
}

export default DeleteButton