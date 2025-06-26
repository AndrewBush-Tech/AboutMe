import React from "react";
import AnimatedCard from "./AnimatedCard";
import "./Projects.css";

export default function Projects() {
  const projects = [
    {
      title: "Job Matching and Resume Analysis",
      description: `
Built a full-stack web app to help users match their resumes with job listings.
Created a Flask-based backend for scraping job listings from various websites, storing them in a database, and matching them to user resumes using machine learning.
The app allows users to upload resumes, which are then analyzed and compared to job listings to find the best match based on skills, experience, and job requirements.
Built an efficient system for scraping and storing job data, ensuring that the app can handle large datasets.
Integrated a front-end interface with React for a seamless user experience, enabling users to easily upload their resumes and view the best matching jobs.
      `,
      link: "https://andrewbush-tech.github.io/jobFinder/"
    },
    {
      title: "Autonomous Vehicle Research Software Optimization",
      description: `
Enhanced computer vision algorithms in Python, improving software efficiency on testing simulation.
Conducted peer code reviews and collaborated with cross-functional teams to refine and validate research-driven
improvements.
Documented system enhancements, ensuring knowledge transfer for continued optimization in autonomous vehicle
applications.
      `,
      link: "https://github.com/metadriverse/metadrive",
      commaLink: "https://comma.ai/",
      projectRelation: "This project involves optimizing computer vision software used for autonomous vehicles. It is closely related to the work done by Comma.ai and their software stack used in autonomous driving systems."
    },
    {
      title: "Natural Language Processing Microservice",
      description: `
Developed a Flask-based microservice that retrieves Wikipedia summaries and integrates them into AI-generated
responses.
Designed an efficient request pipeline, handling structured search queries and processing data into JSON responses.
Integrated OpenAI’s GPT model, enabling context-aware content generation by enriching responses with Wikipedia
data.
Built a user-friendly front-end with Flask, enhancing usability and real-time interaction.
Implemented robust API request handling with error handling and automated JSON data parsing, ensuring high
response reliability.
      `,
      link: "https://github.com/AndrewBush-Tech/Microservice"
    },
  ];

  return (
    <div id="projects" className="projects-container">
      <h2 className="projects-header glowing-text">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Wrap the entire card with a clickable link */}
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <AnimatedCard>
                {/* Project title */}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </AnimatedCard>
            </a>

            {/* Render the Comma.ai link and description for the Autonomous Vehicle Project */}
            {project.commaLink && (
              <>
                <p className="project-relation">
                  <b>Project Relation:</b> {project.projectRelation}
                </p>
                <a
                  href={project.commaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-button"
                >
                  Learn More about Comma.ai
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
