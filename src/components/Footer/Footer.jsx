import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";  // TikTok is importálva
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-text">© 2025 Minden jog fenntartva.</p>
        </div>
        <div className="footer-center">
          <p className="footer-subtext">
            Készítette: <a href="https://yourwebsite.com" className="footer-link">Te</a>
          </p>
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Adatvédelem</a></li>
            <li><a href="#" className="footer-link">Impresszum</a></li>
            <li><a href="#" className="footer-link">Kapcsolat</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" className="social-link"><FaFacebook /></a>
        <a href="https://twitter.com" className="social-link"><FaTwitter /></a>
        <a href="https://instagram.com" className="social-link"><FaInstagram /></a>
        <a href="https://tiktok.com" className="social-link"><FaTiktok /></a> {/* TikTok ikont használunk */}
      </div>
    </footer>
  );
};

export default Footer;
