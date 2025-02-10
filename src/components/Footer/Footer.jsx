import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";  // TikTok is importálva
import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
          <div className="footer-container">
            {/* Bal oldali rész: Copyright */}
            <div className="footer-left">
              <p className="footer-text">© 2025 Minden jog fenntartva.</p>
            </div>
    
            {/* Középső rész: Linkek */}
            <div className="footer-links">
              <a href="#" className="footer-link">Adatvédelem</a>
              <a href="#" className="footer-link">Impresszum</a>
              <a href="#" className="footer-link">Kapcsolat</a>
            </div>
    
            {/* Jobb oldali rész: Közösségi ikonok */}
            <div className="footer-social">
              <a href="https://facebook.com" className="social-link"><FaFacebook /></a>
              <a href="https://twitter.com" className="social-link"><FaTwitter /></a>
              <a href="https://instagram.com" className="social-link"><FaInstagram /></a>
              <a href="https://tiktok.com" className="social-link"><FaTiktok /></a>
            </div>
          </div>
        </footer>
      );
    };
