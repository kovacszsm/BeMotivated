import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Registration } from './Registration';
const axios = require('axios');
jest.mock('axios');

// Mock crypto.subtle.digest (SHA-256 hash)
const dummyHashBuffer = new Uint8Array([1, 2, 3, 4]).buffer;
beforeAll(() => {
  global.crypto = {
    subtle: {
      digest: jest.fn().mockResolvedValue(dummyHashBuffer)
    }
  };
});

describe('Registration komponens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn(); // mock alert
  });

  it('rendereli az összes mezőt és gombot', () => {
    render(<Registration />);
    expect(screen.getByPlaceholderText('Felhasználónév')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jelszó')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jelszó újra')).toBeInTheDocument();
    expect(screen.getByText('Regisztráció')).toBeInTheDocument();
  });

  it('kitölthetők az űrlapmezők', () => {
    render(<Registration />);
    fireEvent.change(screen.getByPlaceholderText('Felhasználónév'), { target: { value: 'tesztuser' } });
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'teszt@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), { target: { value: 'jelszo123' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó újra'), { target: { value: 'jelszo123' } });

    expect(screen.getByPlaceholderText('Felhasználónév').value).toBe('tesztuser');
    expect(screen.getByPlaceholderText('E-mail').value).toBe('teszt@example.com');
    expect(screen.getByPlaceholderText('Jelszó').value).toBe('jelszo123');
    expect(screen.getByPlaceholderText('Jelszó újra').value).toBe('jelszo123');
  });

  it('hibát dob ha a jelszavak nem egyeznek', async () => {
    render(<Registration />);
    fireEvent.change(screen.getByPlaceholderText('Felhasználónév'), { target: { value: 'tesztuser' } });
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'teszt@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), { target: { value: 'abc123' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó újra'), { target: { value: 'másik' } });

    fireEvent.click(screen.getByText('Regisztráció'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('A jelszavak nem egyeznek!');
    });
  });

  it('sikeres regisztráció esetén elküldi az adatokat', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(<Registration />);
    fireEvent.change(screen.getByPlaceholderText('Felhasználónév'), { target: { value: 'tesztuser' } });
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'teszt@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), { target: { value: 'abc123' } });
    fireEvent.change(screen.getByPlaceholderText('Jelszó újra'), { target: { value: 'abc123' } });

    fireEvent.click(screen.getByText('Regisztráció'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("https://localhost:7040/api/Registry", expect.objectContaining({
        FelhasznaloNev: "tesztuser",
        Email: "teszt@example.com",
        Hash: expect.any(String),
        Salt: expect.any(String),
        Profilkep: "default.jpg"
      }));
      expect(window.alert).toHaveBeenCalledWith("Sikeres regisztráció! Ellenőrizze az emailjeit.");
    });
  });
});
