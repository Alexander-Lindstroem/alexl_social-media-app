import Link from "next/link";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="mt-2 border-3 border-rose-500 rounded-lg grow max-w-[1024px] flex flex-col items-center">
      <h2 className="w-full font-bold p-2 text-white text-2xl text-center bg-gradient-to-b to-rose-500 from-red-500">
        Login
      </h2>
      <LoginForm />
      <div className="p-4 bg-gray-100 text-lg mb-4 rounded-xl">
        Don't have an account? Sign up{" "}
        <Link className="font-semibold text-rose-500" href="/auth/signup">
          here!
        </Link>
      </div>
    </div>
  );
};

export default Login;
