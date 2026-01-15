import { createComment } from "@/actions/create-comment"
import { editComment } from "@/actions/edit-comment"
import { commentSchema } from "@/actions/schemas"
import { UserCommentType } from "@/utils/supabase/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type CommentFormProps = {
    postId:number, 
    commentToEdit?:UserCommentType, 
    parentId?:string | null, 
    closeFormFunction:Function
}

const CommentForm = ({postId, commentToEdit, parentId, closeFormFunction}:CommentFormProps) => {
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: commentToEdit ? commentToEdit.text : ""
        }
    })

    const authorId = commentToEdit ? commentToEdit.parent_user : ""
    const commentId = commentToEdit ? commentToEdit?.id : ""

    const {mutate, error} = 
    commentToEdit ?
    useMutation({
        mutationFn: editComment,
        onMutate: () => {toast("Editing comment..."), closeFormFunction()},
        onSettled: () => toast.success("Edit successful!")
    })
    :
    useMutation({
        mutationFn: createComment,
        onMutate: () => {toast("Creating comment..."), closeFormFunction()},
        onSettled: () => toast.success("Comment created!")
    })

    return (
        <form
            onSubmit={handleSubmit(values => {
                mutate({
                    postId,
                    userdata: {
                        comment: values.comment
                    },
                    parentId,
                    authorId,
                    commentId
                })
            })}>
            <fieldset>
                <label htmlFor="comment">Your comment:</label>
                <input 
                    id="comment" 
                    type="text" 
                    {...register('comment')}
                />
            </fieldset>
            <button>Submit</button>
        </form>
    )
}

export default CommentForm