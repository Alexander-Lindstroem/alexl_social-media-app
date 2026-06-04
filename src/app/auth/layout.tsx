"use client";
import Header from "@/components/Header";
import PopupWindow from "@/components/PopupWindow";
import { usePopupContext } from "@/providers/popup-context-provider";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { popupWindow } = usePopupContext();

  return (
    <>
      <Header />
      {popupWindow && <PopupWindow>{popupWindow}</PopupWindow>}
      <main className="mt-[170px] md:mt-[112px] p-4 flex justify-center w-full max-w-[1240px] absolute right-1/2 translate-x-1/2">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
