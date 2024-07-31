import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { columns } from "../todo.constants";

const taskPriorityColorLookupObject = {
    Critical: "bg-primary",
    Intermediate: "bg-tertiary",
    Basic: "bg-black",
};

function TaskListing({
    tasks,
    removeIndex,
    handleTaskComplete,
    handleRemoveTask,
    handleTaskEdit,
    handleOnDragEnd,
}) {
    return (
        <div className="w-full overflow-x-auto" style={{ height: "calc(100% - 57px)" }}>
            <>
                {tasks.length === 0 ? (
                    <p className="mt-5 text-center font-MontserratSemiBold text-xl">
                        No tasks available to show
                    </p>

                ) : (
                    <section className="mt-5 relative w-[700px] md:w-full" style={{ height: "calc(100% - 57px)" }}>
                        <div className="flex justify-between border-b border-primary py-2">
                            {columns.map((column) => (
                                <p
                                    key={column.columnName}
                                    className="text-primary font-MontserratSemiBold text-center truncate w-[20%]"
                                >
                                    {column.columnName}
                                </p>
                            ))}
                        </div>

                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="taskList">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ height: "calc(100% - 40px)" }}
                                        className="w-full overflow-x-hidden overflow-y-auto"
                                    >
                                        {tasks.map((task, taskIndex) => {
                                            return (
                                                <Draggable
                                                    key={String(task.id)}
                                                    draggableId={String(task.id)}
                                                    index={taskIndex}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`py-3 ${task.isComplete ? "bg-gray-300" : "bg-white"
                                                                } ${taskIndex !== tasks.length - 1 &&
                                                                "border-b border-primary"
                                                                }`}
                                                        >
                                                            <div
                                                                className="flex justify-between items-center"
                                                                style={{
                                                                    transform:
                                                                        taskIndex === removeIndex
                                                                            ? `translateX(100%)`
                                                                            : `translateX(0)`,
                                                                    transition: "all 0.5s ease-in-out",
                                                                }}
                                                            >
                                                                <p
                                                                    className={`text-sm truncate text-center w-[20%] ${task.isComplete
                                                                        ? "line-through"
                                                                        : "no-underline"
                                                                        } `}
                                                                >
                                                                    {task.name}
                                                                </p>
                                                                <p className="text-sm truncate text-center w-[20%]">
                                                                    <b
                                                                        className={`${task.isComplete
                                                                            ? "bg-transparent !text-black font-normal line-through"
                                                                            : taskPriorityColorLookupObject[
                                                                            task.priority
                                                                            ] ?? "bg-white"
                                                                            } px-3 py-1 text-white rounded-full inline-block`}
                                                                    >
                                                                        {task.priority}
                                                                    </b>
                                                                </p>
                                                                <p
                                                                    className={`text-sm truncate text-center w-[20%] ${task.isComplete
                                                                        ? "line-through"
                                                                        : "no-underline"
                                                                        } `}
                                                                >
                                                                    {task.description}
                                                                </p>
                                                                <input
                                                                    checked={task.isComplete}
                                                                    type="checkbox"
                                                                    onChange={(e) =>
                                                                        handleTaskComplete({ e, index: taskIndex })
                                                                    }
                                                                    className="h-4 w-[20%] cursor-pointer"
                                                                />
                                                                <div className="flex gap-x-3 justify-center w-[20%]">
                                                                    <MdModeEdit
                                                                        size={24}
                                                                        className="text-primary cursor-pointer"
                                                                        onClick={() =>
                                                                            handleTaskEdit({ index: taskIndex })
                                                                        }
                                                                    />
                                                                    <MdDelete
                                                                        size={24}
                                                                        className="text-primary cursor-pointer"
                                                                        onClick={() =>
                                                                            handleRemoveTask({ index: taskIndex })
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </section>
                )}
            </>
        </div>
    );
}

export default TaskListing;
