import { MdDeleteSweep, MdMarkChatRead } from "react-icons/md";
import DeleteAllPopup from '../components/DeleteAllPopup';
import TaskListing from "../components/TaskListing";
import useTodo from "../useTodo";


function TodoListing() {
    const {
        tasks,
        removeIndex,
        isDeleteAllModalOpen,
        handleTaskComplete,
        handleTaskEdit,
        handleRemoveTask,
        handleOnDragEnd,
        handleMarkAllComplete,
        handleDeleteAll,
        handleToggleDeleteAllModalState
    } = useTodo();

    return (
        <>
            <div className="m-5 p-5 shadow-2xl border rounded-lg">
                <h2 className="font-MontserratSemiBold text-3xl tracking-wide">Todo Listing</h2>
                <div className="mt-6 xs:mt-3 flex flex-wrap gap-3">
                    <button
                        onClick={handleMarkAllComplete}
                        className="flex gap-x-2 items-center border border-primary text-primary  px-3 xs:px-5 py-1 xs:py-2 text-sm rounded-lg"
                    >
                        Mark All as Complete <MdMarkChatRead size={18} />
                    </button>
                    <button
                        onClick={handleToggleDeleteAllModalState}
                        className="flex gap-x-2 items-center border border-primary text-primary  px-3 xs:px-5 py-1 xs:py-2 text-sm rounded-lg"
                    >
                        Delete All <MdDeleteSweep size={24} />
                    </button>
                </div>
                <TaskListing
                    tasks={tasks}
                    removeIndex={removeIndex}
                    handleTaskComplete={handleTaskComplete}
                    handleTaskEdit={handleTaskEdit}
                    handleRemoveTask={handleRemoveTask}
                    handleOnDragEnd={handleOnDragEnd}
                />
            </div>
            {isDeleteAllModalOpen && <DeleteAllPopup
                handleToggleDeleteAllModalState={handleToggleDeleteAllModalState}
                handleDeleteAll={handleDeleteAll}
            />}
        </>
    )
}

export default TodoListing