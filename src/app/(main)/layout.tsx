"use client";
import { usePopupContext } from "@/providers/popup-context-provider";
import Header from "../../components/Header";
import PopupWindow from "@/components/PopupWindow";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { popupWindow } = usePopupContext();

  return (
    <>
      {popupWindow && <PopupWindow>{popupWindow}</PopupWindow>}
      <Header />
      <main className="mt-[170px] md:mt-[112px] p-4 flex justify-center w-full max-w-[1240px] absolute right-1/2 translate-x-1/2">
        {children}
      </main>
    </>
  );
};

export default MainLayout;
