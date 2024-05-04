import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { TodoContextProvider } from "./contexts/TodoContext";

import "./global.css";

export function App() {
  return (
    <TodoContextProvider>
      <Header />
      <Tasks />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </TodoContextProvider>
  );
}
