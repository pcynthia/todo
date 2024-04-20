import { TaskProps } from '../../App';
import { Item } from '../Item'

import styles from './Tasks.module.css'

interface TasksProps {
  tasks: TaskProps[];
}

export function Tasks({tasks}: TasksProps) {
  const tasksLength = tasks.length

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tarefas adicionadas</p>
          <span>{tasksLength}</span>
        </div>

        <div>
          <p className={styles.done}>Concluídas</p>
          <span>3/4</span>
        </div>
      </header>

      {tasks.map(task => (
        <p key={task.id}>{task.title}</p>
      ))}

      <div>
        <Item/>
      </div>
    </section>
  )
}