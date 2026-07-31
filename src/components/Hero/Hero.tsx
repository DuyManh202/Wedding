import React from 'react';
import './Hero.css';
import heroImg from '../../img/2aOboQnzQvYt5P1kctrEoVHCLtbTQVD1SpMKJEsC.jpg';

const Hero: React.FC = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <img src={heroImg} alt="Văn Tuấn & Xuân Mai" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-save-date">Save The Date</div>
        <h1 className="hero-names cursive">Văn Tuấn<br/>&<br/>Xuân Mai</h1>
        <div className="hero-date">
          <span className="date-number">07</span>
          <span className="date-separator">.</span>
          <span className="date-number">08</span>
          <span className="date-separator">.</span>
          <span className="date-number">2026</span>
        </div>
        <p className="hero-location">Hà Nội, Việt Nam</p>
      </div>
    </section>
  );
};

export default Hero;
