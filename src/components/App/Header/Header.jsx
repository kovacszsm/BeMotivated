import React from "react";
import "./Header.css";

export const Header = ({
  theme,
  toggleTheme,
  selectedAvatar,
  storedUser,
  level,
  streak,
  xpFillWidth,
  openSettingsModal,
  handleLogout,
  handleNavClick,
  currentView
}) => {
  return (
    <header className="app-header">
      <div className="user-profile">
        <div className="avatar-section">
          <img src={selectedAvatar} alt="Profilkép" className="avatar" />
          <div className="username">{storedUser?.FelhasznaloNev}</div>
        </div>

        <div className="stats-section">
          <div className="level-streak-row">
            <span className="level-text">LvL {level}</span>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: xpFillWidth }}></div>
          </div>
        </div>

        <div className="left-menu">
          <button
            className={`nav-button ${currentView === "statisztika" ? "active" : ""}`}
            onClick={() => handleNavClick("statisztika")}
          >
            Statisztika
          </button>
          <button
            className={`nav-button ${currentView === "teendok" ? "active" : ""}`}
            onClick={() => handleNavClick("teendok")}
          >
            Teendők
          </button>
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
  );
};
