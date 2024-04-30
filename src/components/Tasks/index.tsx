import { TaskProps } from "../../App";
import { Item } from "../Item";
import { Empty } from "./Empty";

import styles from "./Tasks.module.css";

interface TasksProps {
  tasks: TaskProps[];
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, newTitleTask: string) => void;
  onToggleTaskStatus: ({ id, value }: { id: string; value: boolean }) => void;
}

export function Tasks({
  tasks,
  onDeleteTask,
  onUpdateTask,
  onToggleTaskStatus,
}: TasksProps) {
  const tasksCounter = tasks.length;
  const checkedTasksCounter = tasks.filter((task) => task.isChecked).length;

  return (
    <section className={styles.tasks}>
      {tasksCounter > 0 && (
        <header className={styles.header}>
          <div>
            <p>Tarefas adicionadas</p>
            <span>{tasksCounter}</span>
          </div>

          <div>
            <p className={styles.done}>Concluídas</p>
            <span>
              {checkedTasksCounter} / {tasksCounter}
            </span>
          </div>
        </header>
      )}

      <div className={styles.list}>
        {tasks.map((task) => (
          <Item
            key={task.id}
            data={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onToggleTaskStatus={onToggleTaskStatus}
          />
        ))}

        {tasksCounter === 0 && <Empty />}
      </div>
    </section>
  );
}
