import { usePopupContext } from "@/providers/popup-context-provider";
import { ReactNode } from "react";

export default function PopupWindow({ children }: { children: ReactNode }) {
  const { setPopupWindow } = usePopupContext();

  function handleClick() {
    setPopupWindow(null);
  }

  return (
    <div
      onClick={handleClick}
      className="fixed top-0 left-0 h-full w-full bg-black/40 z-200"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute bottom-1/2 right-1/2 translate-1/2"
      >
        {children}
      </div>
    </div>
  );
}
