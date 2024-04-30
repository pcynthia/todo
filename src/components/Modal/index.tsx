import { PencilSimple, XCircle } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import Modal from "react-modal";
import { TaskProps } from "../../App";
import styles from "../Modal/Modal.module.css";

interface EditModalProps {
  task: TaskProps;
  isOpen: boolean;
  onUpdateTask: (taskId: string, newTitleTask: string) => void;
  onCloseModal: () => void;
}

export function EditModal({
  task,
  isOpen,
  onUpdateTask,
  onCloseModal,
}: EditModalProps) {
  console.log("task", task);

  const [newTitleTask, setNewTitleTask] = useState(task.title);

  function handleUpdateTask(event: FormEvent) {
    event.preventDefault();

    if (newTitleTask === task.title) {
      onCloseModal();
      alert("O título da task não foi alterado!");
      return;
    }

    onUpdateTask(task.id, newTitleTask);
    onCloseModal();
  }

  function handleUpdateTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTitleTask(event.target.value);
  }

  function handleNewTitleInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("O campo não pode ficar vazio!");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      contentLabel="Example Modal"
      className={"react-modal-content"}
      overlayClassName={"react-modal-overlay"}
      ariaHideApp={false}
    >
      <div className={styles.modalContainer}>
        <h2>Editar task</h2>

        <button className="react-modal-close" onClick={onCloseModal}>
          <XCircle size={24} />
        </button>

        <form className={styles.updateTaskForm} onSubmit={handleUpdateTask}>
          <input
            type="text"
            placeholder="Editar tarefa"
            value={newTitleTask}
            onChange={handleUpdateTaskChange}
            onInvalid={handleNewTitleInvalid}
            required
          />
          <button>
            Editar
            <PencilSimple size={20} />
          </button>
        </form>
      </div>
    </Modal>
  );
}
