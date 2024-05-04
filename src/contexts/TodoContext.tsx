import { ReactNode, createContext, useEffect, useState } from "react";
import { TaskProps } from "../types/tasks";

interface CreateTaskProps {
  title: string;
}

interface TodoContextType {
  tasks: TaskProps[];
  createTask: (data: CreateTaskProps) => void;
  updateTask: (taskId: string, newTitleTask: string) => void;
  removeTask: (taskId: string) => void;
  toggleTask: (taskId: string, value: boolean) => void;
}

const LOCAL_STORAGE_KEY = "tasks";

export const TodoContext = createContext({} as TodoContextType);

interface TodoContextProviderProps {
  children: ReactNode;
}

export function TodoContextProvider({ children }: TodoContextProviderProps) {
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: "1",
      title: "Estudar React",
      isChecked: false,
    },
    {
      id: "2",
      title: "Estudar TypeScript",
      isChecked: false,
    },
    {
      id: "3",
      title: "Estudar Next.js",
      isChecked: false,
    },
  ]);

  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }

  function setTasksAndSaveOnLocalStorage(tasks: TaskProps[]) {
    setTasks(tasks);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }

  function createTask(data: CreateTaskProps) {
    const newTask = {
      id: crypto.randomUUID(),
      title: data.title,
      isChecked: false,
    };

    setTasksAndSaveOnLocalStorage([...tasks, newTask]);
  }

  function updateTask(taskId: string, newTitleTask: string) {
    const updatedTask = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          title: newTitleTask,
          isChecked: false,
        };
      }

      return task;
    });

    setTasksAndSaveOnLocalStorage(updatedTask);
  }

  function removeTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasksAndSaveOnLocalStorage(tasksWithoutDeletedOne);
  }

  function toggleTask(taskId: string, value: boolean) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isChecked: value,
        };
      }

      return { ...task };
    });

    setTasksAndSaveOnLocalStorage(updatedTasks);
  }

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        removeTask,
        toggleTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
