'use client'
import { login } from "../../../../actions/login"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../../../actions/schemas"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import { toast } from "sonner"

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginSchema)
    })

    const { mutate, isPending, data, error } = useMutation({
        mutationFn: login,
        onMutate: () => toast("Logging in..."),
        onSettled: () => toast.success("Welcome!")
    })

    return ( 
        <div>
            <form onSubmit={handleSubmit(values => mutate(values))} className="flex p-4 flex-col w-[700px] mx-auto">
                <fieldset>
                    <label htmlFor="email">Enter your e-mail</label>
                    <input {...register("email")} id="email" placeholder="Enter you e-mail..."/>
                    {errors.email && <ErrorMessage message={errors.email.message!}/>}
                </fieldset>
                <fieldset>
                    <label htmlFor="pw">Enter your password</label>
                    <input {...register("password")} type="password" id="password" placeholder="Enter you password..."/>
                    {errors.password && <ErrorMessage message={errors.password?.message!}/>}
                </fieldset>
                <button className="button-secondary">Log in!</button>
            </form>
            {data?.error && <p>{data.error}</p>}
            {isPending && <p>Loading...</p>}
        </div>
    )
}

export default LoginForm