import z from "zod"

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Your password must be a minimum of 6 characters long")
})

const usernameMinLength = 3
const passwordMinLength = 6
export const signupSchema = z.object({
    email: z.email(),
    username: z.string().min(usernameMinLength, `Your username must be a minimum of ${usernameMinLength} characters long`),
    password: z.string().min(passwordMinLength, `Your password must be a minimum of ${passwordMinLength} characters long`)
})

export const postSchema = z.object({
    title: z.string().min(3, "Titles must have at least 3 characters").max(100, "Title cannot have more than 100 characters"),
    content: z.string().optional(),
    image: z.instanceof(FormData).optional(),
    category: z.number()
})

export const commentSchema = z.object({
    comment: z.string().min(2, "A comment must be at least 2 characters long")
})