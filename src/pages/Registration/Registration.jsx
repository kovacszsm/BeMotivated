import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Registration.css";
import { Footer } from "../../components/Footer/Footer";

// SHA-256 hash készítése (Web Crypto API használatával)
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

// Salt generálása
const generateSalt = (length = 16) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < length; i++) {
    salt += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return salt;
};

export const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }

    const salt = generateSalt(); // Salt generálása
    const combinedPassword = formData.password + salt;
    const hashedPassword = await hashPassword(combinedPassword); // Hash készítése

    try {
      const response = await axios.post("https://localhost:7040/api/Registry", {
        FelhasznaloNev: formData.username,
        Email: formData.email,
        Hash: hashedPassword, // SHA-256 hash
        Salt: salt, // Generált salt
        Profilkep: "default.jpg",
      });

      alert("Sikeres regisztráció! Ellenőrizze az emailjeit.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        Profilkep: "default.jpg"
      });
    } catch (error) {
      if (error.response) {
        alert(`Hiba: ${error.response.data}`);
      } else {
        alert("Hiba történt a regisztráció során.");
      }
    }
  };

  return (
    <div>
      <div className="register-page">
        <div className="register-container">
          <h1><i>BeMotivated</i></h1>
          <h2>Új fiók létrehozása</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Felhasználónév"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Jelszó"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Jelszó újra"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span style={{ fontSize: "xx-small" }}>
              A "Regisztráció" gombra kattintva automatikusan elfogadod az Általános Szerződési Feltételeket.
            </span>
            <br />
            <button type="submit">Regisztráció</button>
          </form>
          <p className="small-text">
            Már van fiókod? <Link to="/login" className="login-btn">Jelentkezz be</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

