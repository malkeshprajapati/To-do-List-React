import { IoAdd } from "react-icons/io5";
import useTodo from '../useTodo';
import { useParams } from "react-router-dom";

function TodoAdd() {
    const {
        modalState,
        handleTaskPriority,
        handleTaskUpdate,
        handleTaskSubmit,
        handleInputChange,
    } = useTodo();

    const { todoId: id = null } = useParams()

    return (
        <div className="m-5 p-5 shadow-2xl border rounded-lg">
            <div
                className="bg-white rounded-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between px-5 py-3 border-b-2">
                    <h2 className="text-primary tracking-wide text-xl font-MontserratSemiBold">
                        {id ? "Update" : "Add"} Task
                    </h2>
                </div>

                <div className="px-5 py-3">
                    <div className="flex flex-col sm:flex-row items-center flex-start sm:justify-between">
                        <p className="w-full sm:w-[25%] mb-1 sm:mb-0">Task Name </p>
                        <span className="mx-5 w-[5%] hidden sm:inline-block">:</span>
                        <input
                            name="taskName"
                            value={modalState.taskName}
                            placeholder="Enter Task Name"
                            className="border border-black focus:border-primary focus:outline-primary px-3 py-2 rounded-md w-full"
                            onChange={(e) => handleInputChange({ e, type: 'taskName' })}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center my-4 sm:my-0 sm:mt-3">
                        <p className="w-full sm:w-[25%] mb-1 sm:mb-0">Task Priority</p>
                        <span className="mx-5 w-[5%] hidden sm:inline-block">:</span>

                        <div className="w-full flex flex-wrap gap-3">
                            <button
                                onClick={() => handleTaskPriority({ taskPriority: "Critical" })}
                                className={`border border-primary px-3 xs:px-5 py-1 xs:py-2 text-sm xs:text-base rounded-lg ${modalState.taskPriority === "Critical"
                                    ? "text-white bg-primary"
                                    : "text-primary bg-white"
                                    }`}
                            >
                                Critical
                            </button>
                            <button
                                onClick={() => handleTaskPriority({ taskPriority: "Intermediate" })}
                                className={`border bg-white px-3 xs:px-5 py-1 xs:py-2 text-sm xs:text-base rounded-lg ${modalState.taskPriority === "Intermediate"
                                    ? "text-white !bg-tertiary"
                                    : "border-tertiary text-tertiary"
                                    }`}
                            >
                                Intermediate
                            </button>
                            <button
                                onClick={() => handleTaskPriority({ taskPriority: "Basic" })}
                                className={`border bg-white px-3 xs:px-5 py-1 xs:py-2 text-sm xs:text-base rounded-lg ${modalState.taskPriority === "Basic"
                                    ? "text-white !bg-black"
                                    : "border-black text-black"
                                    }`}
                            >
                                Basic
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row mt-3">
                        <p className="w-full sm:w-[25%] mb-1 sm:mb-0">Task Description</p>
                        <span className="mx-5 w-[5%] hidden sm:inline-block">:</span>
                        <textarea
                            name='taskDescription'
                            value={modalState.taskDescription}
                            placeholder="Enter Task Description"
                            className="border border-black focus:border-primary focus:outline-primary px-3 py-2 rounded-md w-full"
                            onChange={(e) => handleInputChange({ e, type: 'taskDescription' })}
                        />
                    </div>
                </div>

                <div className="border-t-2 px-5 py-2">
                    <button
                        onClick={id ? () => handleTaskUpdate({ id }) : handleTaskSubmit}
                        className="ml-auto flex gap-x-2 items-center bg-primary hover:bg-white text-white hover:text-primary border border-primary px-5 py-3 text-sm rounded-lg"
                    >
                        {id ? "Update" : "Add"} Task <IoAdd size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoAdd