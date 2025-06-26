import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Skills.css";

export default function SkillsCarousel() {
  const skills = [
    { name: "Python", url: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", description: "A high-level programming language used for web development, data science, and AI." },
    { name: "JavaScript", url: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", description: "A versatile language primarily used for web development to create interactive elements." },
    { name: "C++", url: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png", description: "A powerful programming language used for system software, game development, and performance-critical applications." },
    { name: "React", url: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png", description: "A JavaScript library for building user interfaces, particularly for single-page applications." },
    { name: "Java", url: "https://cdn-icons-png.flaticon.com/512/226/226777.png", description: "A widely used object-oriented language known for its portability across platforms, especially in enterprise applications." },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div id="skills" className="skills-carousel-container">
      <h2 className="skills-header glowing-text">Technical Skills</h2>
      <div className="skills-carousel">
        <Slider {...settings}>
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-image-container">
                <img
                  src={skill.url}
                  alt={skill.name}
                  className="skill-image"
                />
                <div className="skill-description">{skill.description}</div>
              </div>
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
