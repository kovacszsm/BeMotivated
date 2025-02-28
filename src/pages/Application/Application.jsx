import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Importáljuk a komponenseket
import { Header } from "../../components/App/Header/Header";
import { Kihivasok } from "../../components/App/Kihivasok/Kihivasok";
import { Statisztika } from "../../components/App/Statisztika/Statisztika";
import { Teendok } from "../../components/App/Teendok/Teendok";

// Importáljuk az oldalspecifikus CSS-t
import "./Application.css";

// API alap URL:
const API_URL = `https://localhost:7040/api`;

// Felhasználó adatainak betöltése a sessionStorage-ból
const storedUser = JSON.parse(sessionStorage.getItem("userData"));
console.log(storedUser?.FelhasznaloNev);
console.log(storedUser?.Token);

// Segédfüggvények
const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const weekDates = (() => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return formatLocalDate(date);
  });
})();

const dayNames = (() => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date
      .toLocaleDateString("hu-HU", { weekday: "long" })
      .replace(/^\w/, (c) => c.toUpperCase());
  });
})();

// Predefiniált tevékenységek
const initialTasks = {};

const predefinedTasks = {
  "Sport & Testmozgás": [
    { id: 1, text: "Edzés", icon: "🏋️‍♂️" },
    { id: 2, text: "Futás", icon: "🏃‍♂️" }
    // ... további tevékenységek
  ],
  "Egészség & Wellness": [
    { id: 41, text: "Orvosi vizsgálat", icon: "🏥" }
    // ... további tevékenységek
  ],
  "Munka & Tanulás": [
    { id: 52, text: "Munka", icon: "💼" }
    // ... további tevékenységek
  ],
  "Szórakozás & Hobbi": [
    { id: 66, text: "Filmnézés", icon: "🎬" }
    // ... további tevékenységek
  ],
  "Kapcsolatok & Szociális élet": [
    { id: 83, text: "Családi időtöltés", icon: "🏡" }
    // ... további tevékenységek
  ],
  "Hétköznapi Teendők": [
    { id: 95, text: "Bevásárlás", icon: "🛒" }
    // ... további tevékenységek
  ]
};

const getPredefinedTaskDetails = (categoryId) => {
  for (const cat in predefinedTasks) {
    const found = predefinedTasks[cat].find(
      (task) => task.id === Number(categoryId)
    );
    if (found) return found;
  }
  return { text: "Nincs megnevezés", icon: "❓" };
};

export const Application = () => {
  const navigate = useNavigate();

  // Témaváltó
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Profilkép
  const [selectedAvatar, setSelectedAvatar] = useState(
    storedUser?.Avatar || "http://images.vizsgaremekkzsm.nhely.hu/default.jpg"
  );
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar);
  const [selectedFile, setSelectedFile] = useState(null);

  // Beállítások modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Teendők
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [newTaskData, setNewTaskData] = useState({
    category: "",
    taskId: "",
    start: "",
    end: ""
  });
  const [modalError, setModalError] = useState("");

  // XP és Streak
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const level = Math.floor(xp / 100) + 1;
  const xpFillWidth = `${((xp % 100) / 100) * 100}%`;

  // Nézetváltás: alapértelmezett "teendok"
  const [currentView, setCurrentView] = useState("teendok");

  // Hook-ok
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/GetProfileImage/GetProfileImage/${storedUser.Token}`
        );
        setSelectedAvatar(response.data.profilkep);
      } catch (error) {
        console.error("Hiba a profilkép lekérésekor:", error);
      }
    };
    fetchProfileImage();
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchLevelData();
  }, []);

  // Függvények
  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingsSave = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await axios.post(
          `${API_URL}/ProfileImageUpload/FileUploadFtp/${storedUser.Token}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const response = await axios.get(
          `${API_URL}/GetProfileImage/GetProfileImage/${storedUser.Token}`
        );
        setSelectedAvatar(response.data.profilkep + "?t=" + Date.now());
      }
    } catch (error) {
      console.error("Hiba a profilkép feltöltésekor:", error);
    }
    closeSettingsModal();
  };

  const openSettingsModal = () => setShowSettingsModal(true);
  const closeSettingsModal = () => setShowSettingsModal(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/Task/GetUserTasks/${storedUser.Token}`
      );
      const tasksByDate = {};
      response.data.forEach((task) => {
        const dateStr = formatLocalDate(new Date(task.TaskDate));
        if (!tasksByDate[dateStr]) tasksByDate[dateStr] = [];
        const predefinedTask = getPredefinedTaskDetails(task.CategoryId);
        tasksByDate[dateStr].push({
          id: task.Id,
          start: task.StartTime,
          end: task.EndTime,
          completed: task.Completed,
          text: predefinedTask.text,
          icon: predefinedTask.icon,
          CategoryId: task.CategoryId,
          TaskDate: task.TaskDate
        });
      });
      setTasks(tasksByDate);
    } catch (error) {
      console.error("Hiba a teendők lekérésekor:", error);
    }
  };

  const refreshTasks = async () => await fetchTasks();

  const fetchLevelData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/Level/get/${storedUser.Token}`
      );
      setXp(response.data.xp);
      setStreak(response.data.streak);
    } catch (error) {
      console.error("Hiba a szint adatok lekérésekor:", error);
    }
  };

  const openModal = (date) => {
    setModalDate(date);
    setShowModal(true);
    setNewTaskData({ category: "", taskId: "", start: "", end: "" });
    setModalError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setModalError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTaskData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (name === "category") {
      setNewTaskData((prev) => ({ ...prev, taskId: "" }));
    }
  };

  const timeStringToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const isTimeConflict = (newStart, newEnd, existingStart, existingEnd) => {
    return newStart < existingEnd && newEnd > existingStart;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError("");
    const { category, taskId, start, end } = newTaskData;
    if (!category || !taskId || !start || !end) {
      setModalError("Minden mezőt ki kell tölteni!");
      return;
    }
    if (start >= end) {
      setModalError(
        "A kezdési időnek kisebbnek kell lennie, mint a befejezési idő!"
      );
      return;
    }
    if (!modalDate) {
      setModalError("Hibás dátum!");
      return;
    }
    if (
      tasks[modalDate] &&
      tasks[modalDate].some((task) =>
        isTimeConflict(
          timeStringToMinutes(start),
          timeStringToMinutes(end),
          timeStringToMinutes(task.start),
          timeStringToMinutes(task.end)
        )
      )
    ) {
      setModalError("Ez az időintervallum már foglalt!");
      return;
    }
    let formattedTaskDate;
    try {
      const parts = modalDate.split(".");
      if (parts.length === 3) {
        const day = Number(parts[2]);
        const month = Number(parts[1]);
        const year = Number(parts[0]);
        const utcDate = new Date(Date.UTC(year, month - 1, day));
        formattedTaskDate = utcDate.toISOString();
      } else {
        formattedTaskDate = new Date(modalDate).toISOString();
      }
    } catch (error) {
      setModalError("Hibás dátumformátum!");
      return;
    }
    const taskToAdd = {
      Id: 0,
      UserId: 0,
      CategoryId: Number(taskId),
      StartTime: start,
      EndTime: end,
      TaskDate: formattedTaskDate,
      Completed: false
    };
    try {
      const response = await axios.post(
        `${API_URL}/Task/PostTask/${storedUser.Token}`,
        taskToAdd,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        await refreshTasks();
        closeModal();
      } else {
        setModalError("Hiba történt a feladat hozzáadásakor!");
      }
    } catch (error) {
      setModalError("Hiba történt a feladat mentésekor!");
      console.error("POST hiba:", error);
    }
  };

  const handleCompleteTask = async (task) => {
    const updatedTask = {
      Id: task.id,
      UserId: 0,
      CategoryId: task.CategoryId,
      StartTime: task.start,
      EndTime: task.end,
      TaskDate: task.TaskDate,
      Completed: true
    };
    try {
      await axios.put(
        `${API_URL}/Task/PutTask/${storedUser.Token}/${task.id}`,
        updatedTask
      );
      await axios.put(
        `${API_URL}/Level/update-xp/${storedUser.Token}`,
        10,
        { headers: { "Content-Type": "application/json" } }
      );
      await refreshTasks();
      await fetchLevelData();
    } catch (error) {
      console.error("Hiba a feladat módosításakor:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(
        `${API_URL}/Task/DeleteTask/${storedUser.Token}/${taskId}`
      );
      await refreshTasks();
    } catch (error) {
      console.error("Hiba a feladat törlésekor:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/Logout/Logout/${storedUser.Token}`);
      sessionStorage.removeItem("userData");
      document.body.classList.remove("dark-mode");
      navigate("/");
    } catch (error) {
      console.error("Hiba a kijelentkezéskor:", error);
    }
  };

  return (
    <div className={`application ${theme === "dark" ? "dark-mode" : ""}`}>
      {/* Fix fejléc */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        selectedAvatar={selectedAvatar}
        storedUser={storedUser}
        level={level}
        streak={streak}
        xpFillWidth={xpFillWidth}
        openSettingsModal={openSettingsModal}
        handleLogout={handleLogout}
        handleNavClick={handleNavClick}
        currentView={currentView}
      />

      {/* Csak a kiválasztott nézet jelenik meg */}
      {currentView === "teendok" && (
        <Teendok
          weekDates={weekDates}
          dayNames={dayNames}
          tasks={tasks}
          openModal={openModal}
          timeStringToMinutes={timeStringToMinutes}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
          showModal={showModal}
          newTaskData={newTaskData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          modalError={modalError}
          closeModal={closeModal}
          predefinedTasks={predefinedTasks}
        />
      )}
      {currentView === "kihivasok" && <Kihivasok />}
      {currentView === "statisztika" && <Statisztika />}

      {/* Beállítások modal */}
      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal-content settings-modal-content">
            <button className="close-settings-button" onClick={closeSettingsModal}>
              ×
            </button>
            <h2>Beállítások</h2>
            <div className="settings-options">
              <div className="profile-pic-upload">
                <h3>Profilkép feltöltése</h3>
                <div className="profile-pic-preview">
                  <img src={tempAvatar} alt="Profilkép előnézet" />
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
            <div className="modal-buttons settings-modal-buttons">
              <button type="button" onClick={handleSettingsSave}>
                Mentés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
