import React from "react";
import "./Teendok.css";
import "./Modal.css";

export const Teendok = ({
  weekDates,
  dayNames,
  tasks,
  openModal,
  timeStringToMinutes,
  handleCompleteTask,
  handleDeleteTask,
  showModal,
  newTaskData,
  handleInputChange,
  handleSubmit,
  modalError,
  closeModal,
  // Most ezt a prop-ot várjuk az API által betöltött adatokkal,
  // nem a lokális objektumot.
  predefinedTasks
}) => {
  return (
    <div className="teendok-container">
      <div className="week-grid">
        {weekDates.map((date, index) => (
          <div key={index} className="day-column">
            <div className="day-header">
              <div className="day-info">
                <span className="day-name">{dayNames[index]}</span>
                <span className="day-date">{date}</span>
              </div>
              <button className="add-task" onClick={() => openModal(date)}>
                +
              </button>
            </div>
            <div className="tasks">
              {(tasks[date] ?? [])
                .sort(
                  (a, b) =>
                    timeStringToMinutes(a.start) -
                    timeStringToMinutes(b.start)
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className={`task ${task.completed ? "completed" : ""}`}
                  >
                    <div className="task-info">
                      <span className="task-icon">{task.icon}</span>
                      <span
                        className="task-text"
                        style={{
                          textDecoration: task.completed ? "line-through" : "none"
                        }}
                      >
                        {task.text}
                      </span>
                    </div>
                    <div
                      className="task-time"
                      style={{
                        textDecoration: task.completed ? "line-through" : "none"
                      }}
                    >
                      {task.start} - {task.end}
                    </div>
                    <div className="task-actions">
                      <button
                        className={`action-btn complete-btn ${
                          task.completed ? "completed" : ""
                        }`}
                        onClick={() => handleCompleteTask(task)}
                        style={{
                          fontSize: task.completed ? "36px" : "28px",
                          color: task.completed
                            ? "var(--accent-color)"
                            : "inherit"
                        }}
                      >
                        ✔
                      </button>
                      <button
                        className="action-btn remove-task"
                        onClick={() => handleDeleteTask(task.id)}
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
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Új teendő hozzáadása</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Kategória:</label>
                <select
                  name="category"
                  value={newTaskData.category}
                  onChange={handleInputChange}
                  required
                  className="custom-dropdown"
                >
                  <option value="">-- Válassz kategóriát --</option>
                  {Object.keys(predefinedTasks).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {newTaskData.category && (
                <div className="form-group">
                  <label>Teendő:</label>
                  <select
                    name="taskId"
                    value={newTaskData.taskId}
                    onChange={handleInputChange}
                    required
                    className="custom-dropdown"
                  >
                    <option value="">-- Válassz teendőt --</option>
                    {predefinedTasks[newTaskData.category].map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.icon} {task.text}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label>Kezdés:</label>
                <input
                  type="time"
                  name="start"
                  value={newTaskData.start}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Befejezés:</label>
                <input
                  type="time"
                  name="end"
                  value={newTaskData.end}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {modalError && <p className="modal-error">{modalError}</p>}
              <div className="modal-buttons">
                <button type="submit">Hozzáadás</button>
                <button type="button" onClick={closeModal}>
                  Mégse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
