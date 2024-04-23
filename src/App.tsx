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
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function createTask(taskTitle: string) {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
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
        onToggleTaskStatus={toggleTask}
      />
    </>
  );
}
