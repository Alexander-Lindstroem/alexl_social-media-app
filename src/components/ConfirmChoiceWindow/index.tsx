import { usePopupContext } from "@/providers/popup-context-provider";

type ConfirmChoiceProps = {
  windowText: string;
  confirmChoice: Function;
};

const ConfirmChoiceWindow = ({
  windowText,
  confirmChoice,
}: ConfirmChoiceProps) => {
  const { setPopupWindow } = usePopupContext();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="bg-white rounded-xl p-4 flex flex-col gap-4"
    >
      <p>{windowText}</p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => confirmChoice()}
          className="bg-red-400 px-4 py-1 rounded-md cursor-pointer"
        >
          Yes
        </button>
        <button
          onClick={() => setPopupWindow(null)}
          className="bg-gray-200 px-4 py-1 rounded-md cursor-pointer"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmChoiceWindow;
