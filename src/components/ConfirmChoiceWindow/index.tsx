type ConfirmChoiceProps = {
    windowText:string,
    closeWindow:Function,
    confirmChoice:Function
}

const ConfirmChoiceWindow = ({windowText, closeWindow, confirmChoice}:ConfirmChoiceProps) => {
    return (
        <div
            id="delete-window"
            onClick={() => closeWindow()}
            className="z-10 fixed left-0 top-0 h-[100vh] w-[100vw] bg-black/50 
            flex justify-center items-center">
            <div 
                onClick={(e) => {e.stopPropagation()}}
                className="bg-white rounded-xl p-4 flex flex-col gap-4">
                <p>{windowText}</p>
                <div className="flex gap-2 justify-center">
                    <button 
                        onClick={() => confirmChoice()}
                        className="bg-red-400 px-4 py-1 rounded-md cursor-pointer">
                        Yes
                    </button>
                    <button 
                        onClick={() => closeWindow()} 
                        className="bg-gray-200 px-4 py-1 rounded-md cursor-pointer">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmChoiceWindow