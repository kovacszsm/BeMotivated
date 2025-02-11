import React, { useState } from "react";
import "./Application.css";

const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];

const initialTasks = {
  Hétfő: [
    { id: 1, text: "Reggeli edzés", icon: "🏋️", start: "06:00", end: "07:00", completed: false },
    { id: 2, text: "Munka", icon: "💼", start: "09:00", end: "17:00", completed: false },
    { id: 3, text: "Bevásárlás", icon: "🛒", start: "18:00", end: "19:00", completed: false }
  ],
  Kedd: [
    { id: 4, text: "Futás a parkban", icon: "🏃", start: "07:00", end: "08:00", completed: false },
    { id: 5, text: "Meeting", icon: "📅", start: "10:00", end: "11:00", completed: false }
  ],
  Szerda: [
    { id: 6, text: "Tanulás", icon: "📖", start: "14:00", end: "16:00", completed: false }
  ],
  Csütörtök: [
    { id: 7, text: "Jóga", icon: "🧘", start: "06:30", end: "07:30", completed: false },
    { id: 8, text: "Programozás", icon: "💻", start: "13:00", end: "16:00", completed: false }
  ],
  Péntek: [
    { id: 9, text: "Mozizás", icon: "🎬", start: "20:00", end: "22:00", completed: false }
  ],
  Szombat: [
    { id: 10, text: "Családi ebéd", icon: "🍽", start: "12:00", end: "14:00", completed: false },
    { id: 11, text: "Baráti találkozó", icon: "🍻", start: "18:00", end: "22:00", completed: false }
  ],
  Vasárnap: [
    { id: 12, text: "Pihenés", icon: "🛌", start: "10:00", end: "12:00", completed: false },
    { id: 13, text: "Olvasás", icon: "📚", start: "17:00", end: "19:00", completed: false }
  ]
};

export const Application = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskCompletion = (day, taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[day] = updatedTasks[day].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
  };

  const removeTask = (day, taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[day] = updatedTasks[day].filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  return (
    <div className="application">
      <header className="app-header">
        <div className="profile">
          <img src="/avatar.png" alt="Profilkép" className="avatar" />
          <div className="user-info">
            <h3>Felhasználó</h3>
            <p>Szint: 5 | Streak: 10 nap</p>
          </div>
        </div>
      </header>
      <div className="week-grid">
        {days.map((day, index) => (
          <div key={index} className="day-column">
            <div className="day-header">
              <span className="day-name">{day}</span>
              <button className="add-task">+</button>
            </div>
            <div className="tasks">
              {tasks[day].map((task) => (
                <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
                  <div className="task-info">
                    <span className="task-icon">{task.icon}</span>
                    <span className="task-text" style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
                  </div>

                  <div className="task-time" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                    {task.start} - {task.end}
                  </div>
                  
                  <div className="task-actions">
                    <button
                      className={`action-btn complete-btn ${task.completed ? "completed" : ""}`}
                      onClick={() => toggleTaskCompletion(day, task.id)}
                      style={{ fontSize: task.completed ? "36px" : "28px", color: task.completed ? "#50c878" : "inherit" }}
                      onMouseEnter={(e) => e.target.style.color = task.completed ? "#7cfc98" : "#50c878"}
                      onMouseLeave={(e) => e.target.style.color = task.completed ? "#50c878" : "inherit"}
                    >
                      ✔
                    </button>
                    <button
                      className="action-btn remove-task"
                      onClick={() => removeTask(day, task.id)}
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
