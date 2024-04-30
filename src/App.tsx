import { useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import "./global.css";

export interface TaskProps {
  id: string;
  title: string;
  isChecked: boolean;
}

export function App() {
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

  function createTask(taskTitle: string) {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
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

  function deleteTask(taskId: string) {
    if (!confirm("Deseja mesmo apagar essa tarefa?")) {
      return;
    }

    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function toggleTask({ id, value }: { id: string; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
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
    <>
      <Header onAddTask={createTask} />
      <Tasks
        tasks={tasks}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
        onToggleTaskStatus={toggleTask}
      />
    </>
  );
}
