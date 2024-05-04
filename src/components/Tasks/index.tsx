import { useContext } from "react";
import { Empty } from "../Empty";
import { Item } from "../Item";

import { TodoContext } from "../../contexts/TodoContext";
import styles from "./Tasks.module.css";

export function Tasks() {
  const { tasks } = useContext(TodoContext);

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
          <Item key={task.id} data={task} />
        ))}

        {tasksCounter === 0 && <Empty />}
      </div>
    </section>
  );
}
