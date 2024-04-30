import { Check, Pencil, Trash } from "@phosphor-icons/react";
import { TaskProps } from "../../App";
import styles from "./Item.module.css";

import { useState } from "react";
import { EditModal } from "../Modal";

interface ItemProps {
  data: TaskProps;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, newTitleTask: string) => void;
  onToggleTaskStatus: ({ id, value }: { id: string; value: boolean }) => void;
}

export function Item({
  data,
  onDeleteTask,
  onUpdateTask,
  onToggleTaskStatus,
}: ItemProps) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const checkboxCheckedClassName = data.isChecked
    ? styles["checkbox-checked"]
    : styles["checkbox-unchecked"];

  function handleTaskToggle() {
    onToggleTaskStatus({ id: data.id, value: !data.isChecked });
  }

  function handleRemoveTask() {
    onDeleteTask(data.id);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
        <button onClick={openModal}>
          <Pencil className={styles.iconPencil} size={16} />
        </button>

        <EditModal
          task={data}
          isOpen={modalIsOpen}
          onCloseModal={closeModal}
          onUpdateTask={onUpdateTask}
        />

        <div className={styles.btn}>
          <button onClick={handleRemoveTask}>
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
