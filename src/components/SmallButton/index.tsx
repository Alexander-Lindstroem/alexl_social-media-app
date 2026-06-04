export default function SmallButton({
  text,
  onClick = () => {},
  color,
}: {
  text: string;
  onClick?: () => void;
  color: "red" | "gray";
}) {
  return (
    <button
      className={`bg-gradient-to-b ${color === "gray" ? "from-gray-700 to-stone-700" : "from-red-500 to-rose-500"} text-white py-0.5 px-2
                  font-semibold text-sm rounded-lg cursor-pointer w-fit`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
