//Alternate solution to getting types from the supabase schema, but this seems a tad more convoluted.
/*import { Database } from "./supabase/database.types"

export type UserCommentType = Database['public']['Tables']['comments']['Row'] & {
    users: {username: string}
}

export type UserCommentWithChildrenType = UserCommentType & {
    children: UserCommentWithChildrenType[]
}*/