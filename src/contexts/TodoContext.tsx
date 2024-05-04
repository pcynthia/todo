import { ReactNode, createContext, useState } from "react";
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

  function createTask(data: CreateTaskProps) {
    const newTask = {
      id: crypto.randomUUID(),
      title: data.title,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
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

    setTasks(updatedTask);
  }

  function removeTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(tasksWithoutDeletedOne);
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

    setTasks(updatedTasks);
  }

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
