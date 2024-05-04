import styles from "./Empty.module.css";

export function Empty() {
  return (
    <section className={styles.empty}>
      <p>Você ainda não tem tarefas cadastradas</p>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </section>
  );
}
