import Link from "next/link";

export const MobileMenuItem = ({
  href = "/",
  title,
  clickFunction = () => {},
}: {
  href?: string;
  title: string;
  clickFunction?: () => void;
}) => {
  return (
    <Link
      onClick={clickFunction}
      href={href}
      className="bg-gradient-to-b md:from-gray-700 to-black/80 border-b-3 border-black
                md:to-stone-700 text-white py-2 px-4 font-semibold md:rounded-2xl text-xl 
                cursor-pointer"
    >
      {title}
    </Link>
  );
};
