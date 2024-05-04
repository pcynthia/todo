import { PlusCircle } from "@phosphor-icons/react";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";
import { TodoContext } from "../../contexts/TodoContext";
import styles from "./Header.module.css";

export function Header() {
  const { createTask } = useContext(TodoContext);

  const [newTask, setNewTask] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    createTask({ title: newTask });
    setNewTask("");
    toast.success("Tarefa criada com sucesso! 🚀");
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
