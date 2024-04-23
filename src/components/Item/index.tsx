import { Check, Pencil, Trash } from "@phosphor-icons/react";
import { TaskProps } from "../../App";
import styles from "./Item.module.css";

interface ItemProps {
  data: TaskProps;
  onDeleteTask: (taskId: string) => void;
  onToggleTaskStatus: ({ id, value }: { id: string; value: boolean }) => void;
}

export function Item({ data, onDeleteTask, onToggleTaskStatus }: ItemProps) {
  const checkboxCheckedClassName = data.isChecked
    ? styles["checkbox-checked"]
    : styles["checkbox-unchecked"];

  function handleTaskToggle() {
    onToggleTaskStatus({ id: data.id, value: !data.isChecked });
  }

  function handleRemoveTask() {
    onDeleteTask(data.id);
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
        <button>
          <Pencil className={styles.iconPencil} size={16} />
        </button>

        <div className={styles.btn}>
          <button onClick={handleRemoveTask}>
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
