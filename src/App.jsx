import React from "react";
import { useState } from "react";
import "./App.css";
import pin from "/src/assets/icone/pin.svg";
import bin from "/src/assets/icone/bin.svg";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task!");
      return;
    }
    setTasks([
      ...tasks,
      { text: newTask, completed: false, pinned: false, createdAt: Date.now() },
    ]);
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const togglePin = (index) => {
    const pinnedCount = tasks.filter((task) => task.pinned).length;
    const isCurrentlyPinned = tasks[index].pinned;

    if (!isCurrentlyPinned && pinnedCount >= 3) {
      alert("You can only pin up to 3 tasks 📌");
      return;
    }

    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, pinned: !task.pinned } : task
    );

    // save the place of item's list position
    updatedTasks.sort((a, b) => {
      if (a.pinned === b.pinned) {
        return a.createdAt - b.createdAt;
      }
      return b.pinned - a.pinned;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h1>My To-Do List </h1>
      <h2>
        <b>keep your mind organized!</b>
      </h2>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(); 
          } }}
        placeholder="Enter a task..."
        style={{ backgroundColor: "lightgray", color: "black" }}
      />
      <button onClick={addTask}>Add</button>

      {tasks.map((task, index) => (
        <li
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid black",
            borderRadius: "12px",
            alignItems: "center",
            gap: "10px",
            padding: "0.6em  1.2em",
            marginTop: "15px",
            font: "inherit",
            color: "black",
            boxShadow: "2px 2px 1px #F79E89",
          }}
        >
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#B5B5BA" : "black",
            }}
          >
            <button
              onClick={() => toggleComplete(index)}
              style={{
                marginRight: "10px",
                backgroundColor: task.completed ? "#B5B5BA" : "white",
                // marginTop: "10px",
                fontSize: "17px",
                padding: "4px 8px",
                border: task.completed
                  ? "2px solid #B5B5BA"
                  : "2px solid #B5B5BA",
                borderRadius: "10px",
              }}
            >
              {task.completed ? "✔" : "✔"}
            </button>
            {task.text}
          </span>
          <div
            className="Task-right"
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <button
              className="pin-button"
              onClick={() => togglePin(index)}
              style={{
                backgroundColor: task.pinned ? "#B5B5BA" : "white",
                padding: "4px 8px",
              }}
            >
              <img src={pin} alt="pin" width="18" height="18"></img>{" "}
            </button>
            <button
              className="bin-button"
              onClick={() => deleteTask(index)}
              style={{
                backgroundColor: "white",
                padding: "0px",
                hover: { color: "red" },
              }}
            >
              <img src={bin} alt="bin" width="18" height="18"></img>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default App;
