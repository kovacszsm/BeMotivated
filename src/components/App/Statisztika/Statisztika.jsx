import React from "react";
import "./Statisztika.css";

// Segédfüggvény, hogy adott teendőkből kiszámoljuk a statisztikákat
const getStats = (taskArray) => {
  const total = taskArray.length;
  const completed = taskArray.filter((task) => task.completed).length;
  const notCompleted = total - completed;
  const completedPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const notCompletedPercentage = total > 0 ? 100 - completedPercentage : 0;
  return { total, completed, notCompleted, completedPercentage, notCompletedPercentage };
};

// Formázó függvény (YYYY.MM.DD)
const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

// Segédfüggvény: adott dátum a jelenlegi héten van-e?
const isInCurrentWeek = (date) => {
  const today = new Date();
  // A JS-ben vasárnap = 0, ezért a hét első napját (hétfő) így számoljuk:
  const day = today.getDay() === 0 ? 7 : today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - day + 1);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return date >= startOfWeek && date <= endOfWeek;
};

export const Statisztika = ({ tasks }) => {
  // Minden teendőt egy tömbbe rendezünk (tasks objektum: kulcs = dátum, érték = teendők tömbje)
  const allTasks = Object.values(tasks).flat();

  // Átalakítjuk a TaskDate string-eket Date objektumokká
  const tasksWithDates = allTasks.map((task) => ({
    ...task,
    dateObj: new Date(task.TaskDate)
  }));

  // Aktuális dátum
  const today = new Date();
  const todayStr = formatLocalDate(today);

  // Szűrés különböző bontásokra
  const dailyTasks = tasksWithDates.filter(
    (task) => formatLocalDate(task.dateObj) === todayStr
  );
  const weeklyTasks = tasksWithDates.filter((task) => isInCurrentWeek(task.dateObj));
  const monthlyTasks = tasksWithDates.filter(
    (task) =>
      task.dateObj.getFullYear() === today.getFullYear() &&
      task.dateObj.getMonth() === today.getMonth()
  );
  const yearlyTasks = tasksWithDates.filter(
    (task) => task.dateObj.getFullYear() === today.getFullYear()
  );

  // Statisztikák kiszámítása
  const overallStats = getStats(tasksWithDates);
  const dailyStats = getStats(dailyTasks);
  const weeklyStats = getStats(weeklyTasks);
  const monthlyStats = getStats(monthlyTasks);
  const yearlyStats = getStats(yearlyTasks);

  // Az egyes bontások statisztikáit egy tömbben rendezzük, hogy könnyebb legyen a megjelenítés
  const statsBreakdown = [
    { label: "Összesen", stats: overallStats },
    { label: "Éves", stats: yearlyStats },
    { label: "Havi", stats: monthlyStats },
    { label: "Heti", stats: weeklyStats },
    { label: "Napi", stats: dailyStats }
  ];

  return (
    <div className="statisztika-container">
      <h2>Teendő Statisztikák</h2>
      <div className="stats-grid">
        {statsBreakdown.map((item) => (
          <div key={item.label} className="stat-breakdown">
            <h3>{item.label}</h3>
            <div className="stat-cards">
              <div className="stat-card completed">
                <h4>Teljesített</h4>
                <p className="stat-number">{item.stats.completed} db</p>
                <p className="stat-percentage">{item.stats.completedPercentage}%</p>
              </div>
              <div className="stat-card not-completed">
                <h4>Nem teljesített</h4>
                <p className="stat-number">{item.stats.notCompleted} db</p>
                <p className="stat-percentage">{item.stats.notCompletedPercentage}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
