import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import "../styles.css";

const STORAGE_KEY = "lab13.tasks";

function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: TaskCardProps[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

export default function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAdd = (newTask: TaskCardProps) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  };

  const allCount = tasks.length;
  const doneCount = tasks.filter((task) => task.isDone).length;

  return (
    <div className="container py-4 font" style={{ maxWidth: "600px" }}>
      <div
        className="card border-0 shadow-sm p-4 text-center"
        style={{ backgroundColor: "#fffdf9", borderRadius: "24px" }}
      >
        <div className="card-body p-2">
          <h2 className="fw-bold mb-3" style={{ color: "#5b556e" }}>
            Todo List
          </h2>

          <div className="d-flex justify-content-center gap-3 my-3">
            <div
              className="card border-0 px-4 py-2 shadow-sm"
              style={{
                backgroundColor: "#e8f1ff",
                color: "#517fa8",
                borderRadius: "18px",
              }}
            >
              <span className="fw-bold fs-6">All</span>
              <span className="fs-3 fw-bolder">{allCount}</span>
            </div>

            <div
              className="card border-0 px-4 py-2 shadow-sm"
              style={{
                backgroundColor: "#e2f7ed",
                color: "#408a66",
                borderRadius: "18px",
              }}
            >
              <span className="fw-bold fs-6">Done</span>
              <span className="fs-3 fw-bolder">{doneCount}</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="btn text-white fw-bold my-3 px-4 py-2 shadow-sm"
              style={{ backgroundColor: "#9bb8ed", borderRadius: "20px" }}
              data-bs-toggle="modal"
              data-bs-target="#todoModal"
            >
              + Add Task
            </button>
          </div>

          <TodoModal onAdd={handleAdd} />

          <div className="mt-2 text-start">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                isDone={task.isDone}
                deleteTaskFunc={deleteTask}
                toggleDoneTaskFunc={toggleDoneTask}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
