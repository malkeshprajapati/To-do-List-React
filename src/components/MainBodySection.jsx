import { IoAdd } from "react-icons/io5";

function MainBodySection({
    handleModalState,
    handleTaskPriority,
    handleInputChange,
}) {
    return (
        <div className="fixed px-3 py-5 w-full xs:w-[90%] md:w-[75%] h-full xs:h-[80%] inset-0 xs:top-1/2 xs:left-1/2 xs:-translate-x-1/2 xs:-translate-y-1/2 bg-white shadow-xl rounded-none xs:rounded-xl">
            <div className="flex flex-wrap justify-between items-center">
                <h1 className="font-MontserratSemiBold text-primary text-xl xs:text-2xl tracking-wide">
                    To Do List
                </h1>
                <button
                    onClick={() => {
                        handleModalState({ title: "Add" });
                        handleTaskPriority({ taskPriority: "" });
                        handleInputChange({ e: null, type: "reset" });
                    }}
                    className="flex gap-x-2 items-center bg-primary hover:bg-white text-white hover:text-primary border border-primary px-3 xs:px-5 py-1 xs:py-2 text-sm rounded-lg"
                >
                    Add Task <IoAdd size={18} />
                </button>
            </div>
        </div>
    );
}

export default MainBodySection;
