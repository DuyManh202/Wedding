import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <h2 className="footer-names cursive">Văn Tuấn & Xuân Mai</h2>
        <p className="footer-date">07.08.2026</p>
        <p className="footer-thankyou">Chân thành cảm ơn sự hiện diện và những lời chúc tốt đẹp của bạn!</p>
      </div>
    </footer>
  );
};

export default Footer;
