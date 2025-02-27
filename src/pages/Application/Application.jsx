import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Application.css";

// API alap URL:
const API_URL = `https://localhost:7040/api`;

// Felhasználó adatainak betöltése a sessionStorage-ból
const storedUser = JSON.parse(sessionStorage.getItem("userData"));
console.log(storedUser?.FelhasznaloNev);
console.log(storedUser?.Token);

// ===============
// SEGÉDFÜGGVÉNYEK
// ===============
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

// ==========================
// PREDEFINIÁLT TEVÉKENYSÉGEK
// ==========================
const initialTasks = {};

const predefinedTasks = {
  "Sport & Testmozgás": [
    { id: 1, text: "Edzés", icon: "🏋️‍♂️" },
    { id: 2, text: "Futás", icon: "🏃‍♂️" },
    { id: 3, text: "Jóga", icon: "🧘‍♂️" },
    { id: 4, text: "Kerékpározás", icon: "🚴‍♂️" },
    { id: 5, text: "Úszás", icon: "🏊‍♂️" },
    { id: 6, text: "Séta", icon: "🚶‍♂️" },
    { id: 7, text: "Nyújtás", icon: "🤸‍♂️" },
    { id: 8, text: "Tornázás", icon: "🤾‍♂️" },
    { id: 9, text: "Pilates", icon: "🧘‍♀️" },
    { id: 10, text: "Guggolás gyakorlás", icon: "🏋️‍♀️" },
    { id: 11, text: "Fekvőtámaszok", icon: "💪" },
    { id: 12, text: "Felülések", icon: "🏋️" },
    { id: 13, text: "Súlyemelés", icon: "🏋️‍♂️" },
    { id: 14, text: "Boxolás", icon: "🥊" },
    { id: 15, text: "Kickbox", icon: "🥊" },
    { id: 16, text: "Küzdősport edzés", icon: "🥋" },
    { id: 17, text: "Labdarúgás (foci)", icon: "⚽" },
    { id: 18, text: "Kosárlabdázás", icon: "🏀" },
    { id: 19, text: "Röplabdázás", icon: "🏐" },
    { id: 20, text: "Kézilabda", icon: "🤾" },
    { id: 21, text: "Jégkorong", icon: "🏒" },
    { id: 22, text: "Tollaslabda", icon: "🏸" },
    { id: 23, text: "Teniszezés", icon: "🎾" },
    { id: 24, text: "Pingpongozás", icon: "🏓" },
    { id: 25, text: "Gördeszkázás", icon: "🛹" },
    { id: 26, text: "Snowboardozás", icon: "🏂" },
    { id: 27, text: "Síelés", icon: "🎿" },
    { id: 28, text: "Lovaglás", icon: "🐎" },
    { id: 29, text: "Íjászat", icon: "🏹" },
    { id: 30, text: "Búvárkodás", icon: "🤿" },
    { id: 31, text: "Vízisí", icon: "🚤" },
    { id: 32, text: "Szörfözés", icon: "🏄‍♂️" },
    { id: 33, text: "Kajakozás", icon: "🚣" },
    { id: 34, text: "Sárkányhajózás", icon: "🛶" },
    { id: 35, text: "Kötélmászás", icon: "🧗" },
    { id: 36, text: "Hegymászás", icon: "🏔️" },
    { id: 37, text: "Parkour", icon: "🏃‍♂️💨" },
    { id: 38, text: "Golf", icon: "⛳" },
    { id: 39, text: "Frizbi", icon: "🥏" },
    { id: 40, text: "Horgászat", icon: "🎣" }
  ],
  "Egészség & Wellness": [
    { id: 41, text: "Orvosi vizsgálat", icon: "🏥" },
    { id: 42, text: "Vitaminok bevétele", icon: "💊" },
    { id: 43, text: "Vízfogyasztás", icon: "🚰" },
    { id: 44, text: "Egészséges étkezés", icon: "🥗" },
    { id: 45, text: "Pihenés", icon: "😌" },
    { id: 46, text: "Alvás", icon: "🛌" },
    { id: 47, text: "Szaunázás", icon: "🔥" },
    { id: 48, text: "Masszázs", icon: "💆‍♂️" },
    { id: 49, text: "Légzőgyakorlatok", icon: "🌬️" },
    { id: 50, text: "Napfényben töltött idő", icon: "🌞" },
    { id: 51, text: "Bőrápolás", icon: "🧴" }
  ],
  "Munka & Tanulás": [
    { id: 52, text: "Munka", icon: "💼" },
    { id: 53, text: "Tanulás", icon: "📚" },
    { id: 54, text: "Olvasás", icon: "📖" },
    { id: 55, text: "Meeting", icon: "📅" },
    { id: 56, text: "Nyelvtanulás", icon: "🌍" },
    { id: 57, text: "Programozás", icon: "💻" },
    { id: 58, text: "Prezentáció készítése", icon: "🖥️" },
    { id: 59, text: "Projekttervezés", icon: "📊" },
    { id: 60, text: "Email kezelés", icon: "📧" },
    { id: 61, text: "Jegyzetelés", icon: "📝" },
    { id: 62, text: "Új készségek tanulása", icon: "🎓" },
    { id: 63, text: "Kutatás vagy információgyűjtés", icon: "🔍" },
    { id: 64, text: "Időmenedzsment", icon: "⏳" },
    { id: 65, text: "Határidők kezelése", icon: "⏰" }
  ],
  "Szórakozás & Hobbi": [
    { id: 66, text: "Filmnézés", icon: "🎬" },
    { id: 67, text: "Sorozatnézés", icon: "📺" },
    { id: 68, text: "Zenehallgatás", icon: "🎵" },
    { id: 69, text: "Hangszeren játszás", icon: "🎸" },
    { id: 70, text: "Rajzolás vagy festés", icon: "🎨" },
    { id: 71, text: "Fotózás", icon: "📷" },
    { id: 72, text: "Kirándulás", icon: "⛰️" },
    { id: 73, text: "Társasjáték", icon: "🎲" },
    { id: 74, text: "Tánc", icon: "💃" },
    { id: 75, text: "Podcast hallgatás", icon: "🎙️" },
    { id: 76, text: "Kézműveskedés", icon: "✂️" },
    { id: 77, text: "Kertészkedés", icon: "🌱" },
    { id: 78, text: "Barkácsolás", icon: "🔨" },
    { id: 79, text: "Kirándulás egy új városba", icon: "🏙️" },
    { id: 80, text: "Videójáték", icon: "🎮" },
    { id: 81, text: "Gasztronómiai élmények kipróbálása", icon: "🍽️" },
    { id: 82, text: "Bor- vagy sörkóstolás", icon: "🍷" }
  ],
  "Kapcsolatok & Szociális élet": [
    { id: 83, text: "Családi időtöltés", icon: "🏡" },
    { id: 84, text: "Baráti találkozó", icon: "🍻" },
    { id: 85, text: "Telefonhívás", icon: "📞" },
    { id: 86, text: "Üzenetek küldése", icon: "💬" },
    { id: 87, text: "Önkénteskedés", icon: "❤️" },
    { id: 88, text: "Születésnapi köszöntés", icon: "🎂" },
    { id: 89, text: "Csapatmunka vagy kollaboráció", icon: "🤝" },
    { id: 90, text: "Új emberekkel való ismerkedés", icon: "🗣️" },
    { id: 91, text: "Együtt főzés", icon: "👩‍🍳" },
    { id: 92, text: "Közösségi eseményen való részvétel", icon: "🎉" },
    { id: 93, text: "Randi", icon: "💖" },
    { id: 94, text: "Jótékonyság", icon: "🎁" }
  ],
  "Hétköznapi Teendők": [
    { id: 95, text: "Bevásárlás", icon: "🛒" },
    { id: 96, text: "Takarítás", icon: "🏠" },
    { id: 97, text: "Mosás", icon: "🧺" },
    { id: 98, text: "Autóvezetés", icon: "🚗" },
    { id: 99, text: "Számlák befizetése", icon: "💵" },
    { id: 100, text: "Postára menés", icon: "📦" },
    { id: 101, text: "Főzés", icon: "🍲" },
    { id: 102, text: "Szemét kivitele", icon: "🚮" },
    { id: 103, text: "Növények locsolása", icon: "🌿" },
    { id: 104, text: "Ruhák selejtezése", icon: "👕" },
    { id: 105, text: "Számítógép vagy telefon rendszerezése", icon: "🖥️" },
    { id: 106, text: "Fiókok rendbetétele", icon: "🗄️" },
    { id: 107, text: "Sportfelszerelés karbantartása", icon: "🎾" },
    { id: 108, text: "Autómosás", icon: "🚘" },
    { id: 109, text: "Új ruhák vásárlása", icon: "🛍️" },
    { id: 110, text: "Heti költségvetés ellenőrzése", icon: "💰" },
    { id: 111, text: "Napi célok kitűzése", icon: "🏆" },
    { id: 112, text: "Naplóírás", icon: "📔" }
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

  // Témaváltó (light/dark)
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Profilkép állapotainak kezelése
  const [selectedAvatar, setSelectedAvatar] = useState(
    storedUser?.Avatar || "http://images.vizsgaremekkzsm.nhely.hu/default.jpg"
  );
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar);
  // Tároljuk a feltöltendő file objektumát
  const [selectedFile, setSelectedFile] = useState(null);

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

  // A beállítások mentésekor feltöltjük a képet a backend-re POST hívással, majd lekérjük a legfrissebb profilképet GET hívással
  const handleSettingsSave = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        // POST feltöltés a profilképhez
        await axios.post(
          `${API_URL}/ProfileImageUpload/FileUploadFtp/${storedUser.Token}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // A feltöltés után lekérjük a legfrissebb profilképet, és az URL-hez hozzáfűzünk egy időbélyeget a cache törléséhez
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

  // Új: Beállítások modal állapot
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Új: XP és Streak állapotok (Level API adatai)
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // A felhasználó szintje a xp alapján (1 szint = 100xp)
  const level = Math.floor(xp / 100) + 1;
  // Az xp sáv kitöltése: a jelenlegi level-en belüli xp százalékos aránya
  const xpFillWidth = `${((xp % 100) / 100) * 100}%`;

  // Frissítjük a body class-t a témának megfelelően
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  // Profilkép lekérése bejelentkezéskor és a komponens betöltésekor
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

  // Teendők lekérése
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/Task/GetTasks/${storedUser.Token}`
      );
      const tasksByDate = {};
      response.data.forEach((task) => {
        const dateStr = formatLocalDate(new Date(task.TaskDate));
        if (!tasksByDate[dateStr]) {
          tasksByDate[dateStr] = [];
        }
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

  const refreshTasks = async () => {
    await fetchTasks();
  };

  // Új: Level adatok lekérése a backend API-ból
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

  // Modal megnyitása
  const openModal = (date) => {
    setModalDate(date);
    setShowModal(true);
    setNewTaskData({ category: "", taskId: "", start: "", end: "" });
    setModalError("");
  };

  // Modal bezárása
  const closeModal = () => {
    setShowModal(false);
    setModalError("");
  };

  // Beállítások modal megnyitása / bezárása
  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };
  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  // Input mezők kezelése
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
        {
          headers: { "Content-Type": "application/json" }
        }
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

  // Ellenőrzi az időütközést két időpont között
  const isTimeConflict = (newStart, newEnd, existingStart, existingEnd) => {
    return newStart < existingEnd && newEnd > existingStart;
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
      // Feladat státuszának frissítése
      await axios.put(
        `${API_URL}/Task/PutTask/${storedUser.Token}/${task.id}`,
        updatedTask
      );
      // Ha sikeres a módosítás, akkor XP-t adunk: 10xp minden completed feladat után
      await axios.put(
        `${API_URL}/Level/update-xp/${storedUser.Token}`,
        10,
        { headers: { "Content-Type": "application/json" } }
      );
      // Frissítjük a teendőket és a szint adatokat
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

  // Komponens betöltésekor lekérdezzük a teendőket és a szint adatokat
  useEffect(() => {
    fetchTasks();
    fetchLevelData();
  }, []);

  return (
    <div className={`application ${theme === "dark" ? "dark-mode" : ""}`}>
      <header className="app-header">
        <div className="user-profile">
          <div className="avatar-section">
            <img src={selectedAvatar} alt="Profilkép" className="avatar" />
            <div className="username">{storedUser?.FelhasznaloNev}</div>
          </div>

          {/* Frissített stat-szekció: LvL és Streak dinamikusan */}
          <div className="stats-section">
            <div className="level-streak-row">
              <span className="level-text">LvL {level}</span>
              <span className="streak gamified-streak">
                {streak}
                <span className="streak-icon">🔥</span>
              </span>
            </div>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: xpFillWidth }}></div>
            </div>
          </div>
          <div className="left-menu">
            <button className="nav-button">Kihívások</button>
            <button className="nav-button">Statisztika</button>
            <button className="nav-button">Függőségek</button>
          </div>

          <div className="action-buttons">
            <button
              className="theme-toggle-button"
              onClick={toggleTheme}
              data-tooltip="Téma váltás"
            >
              {theme === "dark" ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.5V2M12 22v-2.5M4.5 12H2M22 12h-2.5M5.636 5.636L4.222 4.222M19.778 19.778l-1.414-1.414M5.636 18.364l-1.414 1.414M19.778 4.222l-1.414 1.414M12 7a5 5 0 100 10 5 5 0 000-10z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <button
              className="settings-button"
              onClick={openSettingsModal}
              data-tooltip="Beállítások"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.14,12.94l1.06.82a1,1,0,0,1,.26,1.34l-1,1.73a1,1,0,0,1-1.25.38l-1.24-.5a7.49,7.49,0,0,1-1.53.9l-.19,1.33a1,1,0,0,1-1,.86H10.8a1,1,0,0,1-1-.86l-.19-1.33a7.72,7.72,0,0,1-1.53-.9l-1.24.5a1,1,0,0,1-1.25-.38l-1-1.73a1,1,0,0,1,.26-1.34l1.06-.82a7.46,7.46,0,0,1,0-1.79l-1.06-.82a1,1,0,0,1-.26-1.34l1-1.73a1,1,0,0,1,1.25-.38l1.24.5a7.49,7.49,0,0,1,1.53-.9l.19-1.33a1,1,0,0,1,1-.86h2a1,1,0,0,1,1,.86l.19,1.33a7.72,7.72,0,0,1,1.53.9l1.24-.5a1,1,0,0,1,1.25.38l1,1.73a1,1,0,0,1-.26,1.34l-1.06.82a7.46,7.46,0,0,1,0,1.79ZM12,9.5A2.5,2.5,0,1,0,14.5,12,2.5,2.5,0,0,0,12,9.5Z" />
              </svg>
            </button>
            <button
              className="logout-button"
              onClick={handleLogout}
              data-tooltip="Kilépés"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h6v-2H5V5h5V3zm10.293 7.293-3-3-1.414 1.414L17.586 11H9v2h8.586l-2.707 2.707 1.414 1.414 3-3a1 1 0 0 0 0-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

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
              {tasks[date] &&
                [...tasks[date]]
                  .sort(
                    (a, b) =>
                      timeStringToMinutes(a.start) - timeStringToMinutes(b.start)
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

      {/* Új teendő hozzáadása modál */}
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

      {/* Beállítások modál */}
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
              {/* További beállítási opciók igény szerint */}
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