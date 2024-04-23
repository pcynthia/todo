import { PlusCircle } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: HeaderProps) {
  const [newTask, setNewTask] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    onAddTask(newTask);
    setNewTask("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Digite um título para a tarefa! :)");
  }

  return (
    <header className={styles.header}>
      <form className={styles.newTaskForm} onSubmit={handleCreateNewTask}>
        <input
          type="text"
          placeholder="Criar tarefa"
          value={newTask}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button>
          <PlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
