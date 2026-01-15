import { UserCommentType, UserCommentWithChildrenType } from "./supabase/queries";

export const buildCommentTree = (commentData:UserCommentType[],):UserCommentWithChildrenType[] => {
    
    const commentMap = new Map<string, UserCommentWithChildrenType>();
    const roots:UserCommentWithChildrenType[] = []

    commentData.forEach((comment, index) => {
        commentMap.set(comment.id, {...comment, children: []})
    })

    commentData.forEach(comment => {
        const node = commentMap.get(comment.id)!
        if (comment.parent_comment) {
            const parent = commentMap.get(comment.parent_comment)
            if (parent) parent.children.push(node)
        } else roots.push(node)
    })

    return roots
}