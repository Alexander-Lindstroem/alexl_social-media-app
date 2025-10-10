import Link from "next/link"
import LoginForm from "./LoginForm"

const Login = () => {
    return (
        <div className="form-wrapper">
            <h2 className="font-bold text-2xl">Log in!</h2>
            <LoginForm/>
            <div>Don't have an account? Sign up <Link href="/auth/signup">here!</Link></div>
        </div>
    )
}

export default Login