// Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Login } from './Login';

// Mockoljuk az axios-t
jest.mock('axios');

describe("Login komponens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Felülírjuk az alertet a tesztekhez
    window.alert = jest.fn();
    // Átállítjuk a window.location-t, hogy módosítható legyen a tesztben
    delete window.location;
    window.location = { href: '' };
  });

  it("rendereli a bejelentkezési űrlapot", async () => {
    render(<Login />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Felhasználónév")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Jelszó")).toBeInTheDocument();
      expect(screen.getByText("Bejelentkezés")).toBeInTheDocument();
      expect(screen.getByText(/Regisztrálj be/i)).toBeInTheDocument();
    });
  });

  it("űrlapmezők kitöltése működik", async () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Felhasználónév");
    const passwordInput = screen.getByPlaceholderText("Jelszó");

    fireEvent.change(usernameInput, { target: { value: "Zsoltyx" } });
    fireEvent.change(passwordInput, { target: { value: "ASD1234" } });

    expect(usernameInput.value).toBe("Zsoltyx");
    expect(passwordInput.value).toBe("ASD1234");
  });

  it("hibát jelez, ha az űrlap nincs kitöltve", async () => {
    render(<Login />);
    const submitButton = screen.getByText("Bejelentkezés");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Kérjük, töltse ki az összes mezőt!");
    });
  });

  it("sikeres bejelentkezés esetén ment a sessionStorage-be és átirányít", async () => {
    // Mockoljuk a getSalt és a login axios POST hívásokat
    axios.post.mockImplementation((url, data) => {
      if (url.includes("GetSalt")) {
        return Promise.resolve({ data: "SALT123" });
      }
      if (url === "https://localhost:7040/api/Login") {
        return Promise.resolve({ status: 200, data: { username: "Zsoltyx", token: "ASD1234" } });
      }
    });

    // Mockoljuk a crypto.subtle.digest függvényt, hogy egy dummy hash értéket adjon vissza
    const dummyHashBuffer = new Uint8Array([1, 2, 3, 4]).buffer;
    const originalDigest = crypto.subtle.digest;
    crypto.subtle.digest = jest.fn().mockResolvedValue(dummyHashBuffer);

    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Felhasználónév");
    const passwordInput = screen.getByPlaceholderText("Jelszó");

    fireEvent.change(usernameInput, { target: { value: "Zsoltyx" } });
    fireEvent.change(passwordInput, { target: { value: "ASD1234" } });

    const submitButton = screen.getByText("Bejelentkezés");
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Ellenőrizzük, hogy mindkét axios.post hívás megtörtént
      expect(axios.post).toHaveBeenCalledTimes(2);
      // Az átirányítás ellenőrzése
      expect(window.location.href).toBe('/application');
      // A sessionStorage tartalmának ellenőrzése
      const storedUser = sessionStorage.getItem('userData');
      expect(storedUser).toBeTruthy();
      const parsedUser = JSON.parse(storedUser);
      expect(parsedUser.username).toBe("testuser");
    });

    // Visszaállítjuk az eredeti digest függvényt
    crypto.subtle.digest = originalDigest;
  });

  it("hibát jelez, ha a getSalt hívás 404-es hibával tér vissza", async () => {
    // Mockoljuk a getSalt hívást, hogy 404-es hibát dobjon
    axios.post.mockImplementation((url, data) => {
      if (url.includes("GetSalt")) {
        return Promise.reject({ response: { status: 404 } });
      }
    });

    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Felhasználónév");
    const passwordInput = screen.getByPlaceholderText("Jelszó");

    fireEvent.change(usernameInput, { target: { value: "Zsoltyx" } });
    fireEvent.change(passwordInput, { target: { value: "ASD1234" } });

    const submitButton = screen.getByText("Bejelentkezés");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Felhasználónév nem található!");
    });
  });
});
