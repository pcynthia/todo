import { useState } from "react";
import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"
import "./global.css"

export interface TaskProps {
  id: string;
  title: string;
  isChecked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([{
    id: '1',
    title: 'Estudar React',
    isChecked: false
  }, 
  {
    id: '2',
    title: 'Estudar TypeScript',
    isChecked: false
  }, 
  {
    id: '3',
    title: 'Estudar CSS',
    isChecked: false
  }])

  console.log('tasks =>', tasks)

  function createTask(taskTitle: string) {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isChecked: false
    }

    console.log('newTask => ', newTask)

    setTasks([...tasks, newTask])
  }
  
  return (
    <>
      <Header onAddTask={createTask}/>
      <Tasks tasks={tasks}/>
    </>
  )
}

export default App
