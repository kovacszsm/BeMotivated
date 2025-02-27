import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";  // TikTok is importálva
import { Link } from "react-router-dom";
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
              <Link to="#" className="footer-link">Adatvédelem</Link>
              <Link to="#" className="footer-link">Impresszum</Link>
              <Link to="#" className="footer-link">Kapcsolat</Link>
            </div>
    
            {/* Jobb oldali rész: Közösségi ikonok */}
            <div className="footer-social">
              <Link to="https://facebook.com" className="social-link" target="_blank"><FaFacebook /></Link>
              <Link to="https://twitter.com" className="social-link" target="_blank"><FaTwitter /></Link>
              <Link to="https://instagram.com" className="social-link" target="_blank"><FaInstagram /></Link>
              <Link to="https://tiktok.com" className="social-link" target="_blank"><FaTiktok /></Link>
            </div>
          </div>
        </footer>
      );
    };
