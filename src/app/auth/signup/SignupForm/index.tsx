'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { signup } from "@/actions/signup"
import { useForm } from "react-hook-form"
import { signupSchema } from "@/actions/schemas"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import { toast } from "sonner"

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(signupSchema)
    })

    const { mutate, isPending, data, error } = useMutation({
        mutationFn: signup,
        onMutate: () => toast("Registering..."),
        onSettled: () => toast.success("Successfully registered!")
    })

    return ( 
        <div>
            <form onSubmit={handleSubmit(values => mutate(values))} className="flex p-4 flex-col w-[700px] mx-auto">
                <fieldset>
                    <label htmlFor="email">Enter your e-mail</label>
                    <input {...register("email")} id="email" placeholder="Enter you e-mail..."/>
                    {errors && <ErrorMessage message={errors.email?.message!}/>}
                </fieldset>
                <fieldset>
                    <label htmlFor="username">Enter your username</label>
                    <input {...register("username")} id="username" placeholder="Enter you username..."/>
                    {errors && <ErrorMessage message={errors.username?.message!}/>}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Enter your password</label>
                    <input {...register("password")} type="password" id="password" placeholder="Enter you password..."/>
                    {errors && <ErrorMessage message={errors.password?.message!}/>}
                </fieldset>
                <button className="button-secondary">Sign up!</button>
            </form>
            {data?.error && data.error}
            {isPending && <p className="text-red-500">Loading...</p>}
        </div>
    )
}

export default LoginForm