import { Check, Pencil, Trash } from "@phosphor-icons/react";

import { useContext, useState } from "react";

import { TodoContext } from "../../contexts/TodoContext";
import { TaskProps } from "../../types/tasks";

import { EditModal } from "../Modal";

import toast from "react-hot-toast";
import styles from "./Item.module.css";

interface ItemProps {
  data: TaskProps;
}

export function Item({ data }: ItemProps) {
  const { removeTask, toggleTask } = useContext(TodoContext);

  const [modalIsOpen, setIsOpen] = useState(false);

  const checkboxCheckedClassName = data.isChecked
    ? styles["checkbox-checked"]
    : styles["checkbox-unchecked"];

  function handleTaskToggle() {
    toggleTask(data.id, !data.isChecked);
  }

  function handleRemoveTask() {
    removeTask(data.id);

    toast.dismiss();
    toast.success("Tarefa removida com sucesso! 🗑️");
  }

  function confirmRemoveTask() {
    toast(() => (
      <div>
        <p>Tem certeza que deseja remover a tarefa?</p>

        <div className={styles.confirmRemoveContainer}>
          <button className={styles.btnCancel} onClick={() => toast.dismiss()}>
            Cancelar
          </button>
          <button
            className={styles.btnConfirmRemove}
            onClick={handleRemoveTask}
          >
            Remover
          </button>
        </div>
      </div>
    ));
  }

  function handleToggleModal() {
    setIsOpen((state) => !state);
  }

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={handleTaskToggle}>
        <span className={`${styles.checkbox} ${checkboxCheckedClassName}`}>
          {data.isChecked && <Check size={12} />}
        </span>
      </button>

      <p className={data.isChecked ? styles.textChecked : ""}>{data.title}</p>

      <div className={styles.btnContainer}>
        <button onClick={handleToggleModal}>
          <Pencil className={styles.iconPencil} size={16} />
        </button>

        <EditModal
          task={data}
          isOpen={modalIsOpen}
          onCloseModal={handleToggleModal}
        />

        <div className={styles.btn}>
          <button onClick={confirmRemoveTask}>
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
