import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
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

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAdd = (newTask: TaskCardProps) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
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
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <div className="d-flex justify-content-center gap-3 my-3">
          <div className="card border-primary text-primary px-4 py-1 shadow-sm rounded-4">
            <span className="fw-bold fs-6">All</span>
            <span className="fs-3 fw-bolder">{allCount}</span>
          </div>
          <div className="card border-success text-success px-4 py-1 shadow-sm rounded-4">
            <span className="fw-bold fs-6">Done</span>
            <span className="fs-3 fw-bolder">{doneCount}</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
