import Link from "next/link"
import SignupForm from "./SignupForm"

const Signup = () => {
    return (
        <div className="form-wrapper">
            <h2 className="font-bold text-2xl">Sign up!</h2>
            <SignupForm/>
            <div>Already have an account? Log in <Link href="/auth/login">here!</Link></div>
        </div>
    )
}

export default Signup