"use client";
import { login } from "../../../../actions/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../actions/schemas";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { toast } from "sonner";
import { usePopupContext } from "@/providers/popup-context-provider";

const LoginForm = () => {
  const { setPopupWindow } = usePopupContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: login,
    onMutate: () => {
      toast("Logging in...");
      setPopupWindow(
        <p className="text-lg font-bold text-white">Loading...</p>,
      );
    },
    onSettled: () => {
      toast.success("Welcome!");
      setPopupWindow(null);
    },
    onError: () =>
      setPopupWindow(
        <p className="text-lg font-bold text-white">Error Logging in</p>,
      ),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="flex p-4 flex-col mx-auto text-lg"
      >
        <fieldset className="flex flex-col mb-2">
          <label htmlFor="email" className="font-semibold">
            E-mail
          </label>
          <input
            {...register("email")}
            id="email"
            placeholder="Enter you e-mail..."
            className="p-2 m-1 rounded-md bg-gray-100 focus:shadow-[inset_0_0_0_2px_theme(colors.rose.300)] focus:outline-hidden"
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </fieldset>
        <fieldset className="flex flex-col mb-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter you password..."
            className="p-2 m-1 rounded-md bg-gray-100 focus:shadow-[inset_0_0_0_2px_theme(colors.rose.300)] focus:outline-hidden"
          />
          {errors.password && (
            <ErrorMessage message={errors.password?.message!} />
          )}
        </fieldset>
        <button
          className="border-3 bg-gradient-to-b from-red-500 to-rose-500 text-white
                 rounded-lg text-lg font-bold w-full max-w-[200px] p-2 self-center"
        >
          Log in!
        </button>
      </form>
    </>
  );
};

export default LoginForm;
