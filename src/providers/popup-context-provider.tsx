"use client";

import { createContext, useContext, useState } from "react";

type PopupContextType = {
  popupWindow: React.ReactNode;
  setPopupWindow: (popupWindow: React.ReactNode) => void;
};

const PopupContext = createContext<PopupContextType | null>(null);

export const PopupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popupWindow, setPopupWindow] = useState<React.ReactNode | null>(null);

  return (
    <PopupContext.Provider value={{ popupWindow, setPopupWindow }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (context === null) {
    throw new Error("PopupContext must be used within a PageContextProvider");
  }
  return context;
};
