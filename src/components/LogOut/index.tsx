"use client";
import { toast } from "sonner";
import { logout } from "../../actions/logout";
import { useMutation } from "@tanstack/react-query";
import { MobileMenuItem } from "../MobileMenuItem";

const LogOut = () => {
  const { mutate, error } = useMutation({
    mutationFn: logout,
    onMutate: () => toast("Logging you out..."),
    onSettled: () => toast.success("Logged out!"),
  });

  return <MobileMenuItem title="Log Out" clickFunction={mutate} />;
};

export default LogOut;
