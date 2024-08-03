import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { predefinedTasks } from "./todo.constants";
import { useNavigate, useParams } from "react-router-dom";


function useTodo() {
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(predefinedTasks));
  }

  const LSTaskList = JSON.parse(localStorage.getItem("tasks"));

  const navigate = useNavigate()
  const { todoId: id = null } = useParams()

  const [modalState, setModalState] = useState({
    title: "Add",
    isOpen: false,
    taskId: null,
    taskPriority: "",
    taskName: "",
    taskDescription: "",
  });
  const [tasks, setTasks] = useState(LSTaskList);
  const [removeIndex, setRemoveIndex] = useState(null);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  const handleModalState = ({ title = "", taskId = null }) => {
    setModalState((prevState) => ({
      ...prevState,
      title,
      taskId,
      isOpen: !prevState.isOpen,
    }));
  };

  const handleToggleDeleteAllModalState = () => {
    if (tasks.length === 0) {
      toast.error('No tasks found to delete');
      return
    }
    setIsDeleteAllModalOpen((prev) => !prev);
  };

  const handleInputChange = ({
    e,
    type,
    taskName = "",
    taskDescription = "",
  }) => {
    if (type === "reset") {
      setModalState((prevState) => ({
        ...prevState,
        taskName: "",
        taskDescription: "",
      }));
    } else if (type === "update") {
      setModalState((prevState) => ({
        ...prevState,
        taskName,
        taskDescription,
      }));
    } else {
      setModalState((prevState) => ({ ...prevState, [type]: e.target.value }));
    }
  };

  const handleTaskPriority = ({ taskPriority = "" }) => {
    setModalState((prevState) => ({ ...prevState, taskPriority }));
  };

  const handleTaskComplete = ({ e, index }) => {
    setTasks((prevState) => {
      const newState = [...JSON.parse(JSON.stringify(prevState))];
      newState[index].isComplete = e.target.checked;

      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    });
  };

  const handleTaskEdit = ({ index }) => {
    const relevantTask = tasks[index];
    const {
      id: taskId,
      isComplete,
    } = relevantTask ?? {};

    if (isComplete) {
      toast.error("Edit operation not allowed when tasku is marked as complete");
      return;
    }

    navigate(`/update/${taskId}`)
  };

  const handleTaskSubmit = async () => {
    if (!modalState.taskName) {
      toast.error("Please enter task name");
    } else if (!modalState.taskPriority) {
      toast.error("Please select task priority");
    } else if (!modalState.taskDescription) {
      toast.error("Please enter task description");
    } else {
      handleModalState({ title: "" });
      // toast.success("Task added successfully");
      setTasks((prevState) => {
        const newState = [
          ...prevState,
          {
            id: Date.now(),
            name: modalState.taskName,
            priority: modalState.taskPriority,
            description: modalState.taskDescription,
            isComplete: false,
          },
        ];

        localStorage.setItem("tasks", JSON.stringify(newState));

        handleInputChange({ type: 'reset' })
        handleTaskPriority({ taskPriority: "" })
        return newState;
      });

      try {
        const newTask = {
          id: Date.now(),
          name: modalState.taskName,
          priority: modalState.taskPriority,
          description: modalState.taskDescription,
          isComplete: false,
        }
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
        await response.json();
        toast.success("Task saved in database successfully");
      } catch (error) {
        toast.success("Error saving task in database");
      }
    }
  };

  const handleTaskUpdate = ({ id }) => {
    if (!modalState.taskName) {
      toast.error("Please enter task name");
    } else if (!modalState.taskPriority) {
      toast.error("Please select task priority");
    } else if (!modalState.taskDescription) {
      toast.error("Please enter task description");
    } else {
      handleModalState({ title: "" });
      toast.success("Task updated successfully");
      setTasks((prevState) => {
        const updatedTasks = prevState.map((value) => {
          if (+id === +value.id) {
            return {
              ...value,
              name: modalState.taskName,
              description: modalState.taskDescription,
              priority: modalState.taskPriority,
            };
          } else {
            return value;
          }
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        navigate('/listing')

        return updatedTasks;
      });
    }
  };

  const handleRemoveTask = ({ index }) => {
    setRemoveIndex(index)

    setTimeout(() => {
      setRemoveIndex(null)
      setTasks(prevState => {
        const filteredTasks = prevState.filter((_, taskIndex) => taskIndex !== index)

        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
        return filteredTasks
      })
    }, 500)
  }
  const handleMarkAllComplete = () => {
    if (tasks.length === 0) {
      toast.error('No tasks to mark as complete. Please add a task first.');
      return
    }
    setTasks(prevState => {
      const updatedTasks = prevState.map(value => ({ ...value, isComplete: true }))

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks
    })
  }

  const handleDeleteAll = () => {
    setTasks(prevState => {
      const newTasks = [...prevState]
      newTasks.length = 0
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks
    })
    handleToggleDeleteAllModalState()
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);


    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks)
  };


  useEffect(() => {
    if (id) {
      const relevantTask = tasks.filter(value => +value.id === +id);
      const {
        id: taskId,
        name: taskName,
        description: taskDescription,
        priority: taskPriority
      } = relevantTask?.[0] ?? {};

      handleModalState({ title: "Edit", taskId });
      handleInputChange({ e: null, type: "update", taskName, taskDescription });
      handleTaskPriority({ taskPriority });
    }
  }, [id, tasks])

  return {
    tasks,
    modalState,
    removeIndex,
    isDeleteAllModalOpen,
    handleModalState,
    handleTaskPriority,
    handleTaskSubmit,
    handleInputChange,
    handleTaskComplete,
    handleTaskEdit,
    handleTaskUpdate,
    handleRemoveTask,
    handleMarkAllComplete,
    handleDeleteAll,
    handleToggleDeleteAllModalState,
    handleOnDragEnd
  };
}

export default useTodo;
