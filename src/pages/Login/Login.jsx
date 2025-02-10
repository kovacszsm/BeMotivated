import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    };

    const getSalt = async (username) => {
        try {
            const response = await axios.post(`https://localhost:7040/api/Login/GetSalt/${username}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('Felhasználónév nem található!');
            }
            throw new Error('Hiba történt a salt lekérése során!');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert('Kérjük, töltse ki az összes mezőt!');
            return;
        }

        try {
            const salt = await getSalt(username);
            const combinedPassword = password + salt;
            const hashedPassword = await hashPassword(combinedPassword);

            const loginDTO = {
                LoginName: username,
                TmpHash: hashedPassword,
            };

            const response = await axios.post('https://localhost:7040/api/Login', loginDTO);

            if (response.status === 200) {
                const loggedUser = response.data;
                alert(`Sikeres bejelentkezés: ${loggedUser.felhasznaloNev}`);
                localStorage.setItem('authToken', loggedUser.Token);
                // Átirányítás (ha szükséges)
                // window.location.href = '/';
            } else {
                alert('Hibás felhasználónév vagy jelszó!');
            }
        } catch (error) {
            alert(error.message || 'Kapcsolati hiba. Próbálja újra később.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1><i>BeMotivated</i></h1>
                <h2>Bejelentkezés</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Felhasználónév"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Jelszó"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">
                        Bejelentkezés
                    </button>
                </form>
                <p className="small-text">
                    Nincs fiókod?{' '}
                    <Link to="/registration" className="register-btn">
                        Regisztrálj be
                    </Link>
                </p>
            </div>
        </div>
    );
}