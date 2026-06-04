"use client";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import AccountLinks from "../AccountLinks";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  const path = usePathname() ?? "";

  useEffect(() => {
    setShowMenu(false);
  }, [path]);

  return (
    <div className="md:hidden">
      <Menu onClick={handleClick} size={50} />
      {showMenu && (
        <div className="absolute bottom-0 left-0 translate-y-[100%] z-10 w-full h-[100vh] bg-black/90">
          <AccountLinks />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
