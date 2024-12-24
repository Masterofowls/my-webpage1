// About.jsx
import React from "react";
import "./About.css";

const cards = [
];

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p className="description">Learn more about our journey, mission, and values!</p>
      <main className="page-content">
        {cards.map((card, index) => (
          <div key={index} className={`card card-${index + 1}`}>
            <div className="content">
              <h2 className="title">{card.title}</h2>
              <p className="copy">{card.copy}</p>
              <button className="btn">{card.button}</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default About;
