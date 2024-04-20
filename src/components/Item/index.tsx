import { Check, Pencil, Trash } from "@phosphor-icons/react"
import styles from "./Item.module.css"

export function Item() {

  return (
    <div className={styles.task}>
     <button className={styles.checkContainer}>
      <span className={styles.checkbox}>
        <Check size={12} />
      </span>
     </button>
     
     <p className={styles.textChecked}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

     <div className={styles.btnContainer}>
      <button>
        <Pencil className={styles.iconPencil} size={16} />
      </button>

      <div className={styles.btn}>
        <button>
          <Trash/>
        </button>
      </div>
     </div>
    </div>
  )
}