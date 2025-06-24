import React from 'react';
import PortfolioMemoryGame from './Game';

const Projects = () => {
  const projects = [
    {
      title: "Cloud Native Food Ordering & Delivery System",
      description: "A scalable microservices based application that connects restaurants, customers, and delivery agents through independently deployable services for smooth end to end food ordering.",
      technologies: ["MERN stack","vite", "Google Maps API","Geo Code API", "Docker", "Tailwind CSS", "JWT Auth"],
      github: "https://github.com/SE-3Y1S-Microservices-Group-Project/efoods-online-food-ordering-and-delivery-management-system",
      live: "",
      featured: false
    },
    {
      title: "Sequence Memory Game",
      description: "A Memory game that challenges players to remember and reproduce expanding sequences, featuring progressive difficulty levels, quick-flash patterns, and a global leaderboard.",
      technologies: ["React Js","vite", "Node Js", "Mongo DB","Express Js", "Tailwind CSS"],
      github: "https://github.com/Buwaneka-Vishwajith/memory-game",
      live: "#memory-game",
      featured: false,
      isGame: true
    },
    {
      title: "Boarding places Management System",
      description: "A full stack application that simplifies the management of boarding properties for university students and property owners, allowing easy property listings, browsing, and filtering.",
      technologies: ["React Js", "Node Js", "Mongo DB","Express Js", "Tailwind CSS", "JWT Auth"],
      github: "https://github.com/ITP-project-Group-2-1-5/BoardingMERN-2Y2S",
      live: "",
      featured: false
    },
    {
      title: "BudgetBuddy - Expense Tracker",
      description: "A backend for a finance tracking app with JWT authentication, role-based access (admin/user), and support for multi-currency accounts via real-time currency conversion APIs.",
      technologies: [ "Node Js", "Mongo DB","Express Js"],
      github: "https://github.com/Buwaneka-Vishwajith/Finance-tracker---BUdgetBuddy",
      live: "",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="min-h-screen text-slate-300 py-0 pb-20 pr-16">
      <div className="max-w-4xl">

                {/* Memory Game Section */}
        <div id="memory-game" className="mb-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">Bored of scrolling?</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Try out this <b>memory game</b> I built ! <br />
               <b> Test your memory skills</b> as the Grid grows & 
              patterns get more complex with each level.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
              <PortfolioMemoryGame />
            </div>
          </div>
        </div>



        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">
      <span class="text-purple-400">console</span><span class="text-slate-300">.</span><span class="text-blue-400">log</span><span class="text-slate-300">(</span><span class="text-teal-200">"Some Other Things I've Built"</span><span class="text-slate-300">)</span>
          </h2>
          <div className="w-16 h-0.5 bg-teal-300"></div>
        </div>

 

        {/* Other Projects Grid */}
        <div>
          {/* <h3 className="text-2xl font-bold text-slate-200 mb-12 text-center">Other Noteworthy Projects</h3> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-lg border  border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl text-blue-300/60">
                    {project.isGame ? '🂡' : '♦'}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <svg className="w-5 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    {/* <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a> */}
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-slate-200 mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed ">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 font-mono text-xs bg-teal-300/10 text-slate-400 rounded border border-teal-300/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show More Button */}
<div className="text-center mt-8 md:mt-16 px-4">
  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
    <span className='text-blue-400 text-xs sm:text-sm order-1 sm:order-1'>⬅</span>
    <span className='text-blue-400 text-xs sm:text-sm text-center order-3 sm:order-2'>
      Of course the Terminal has the cv
    </span>
    <span className='text-purple-300 text-lg sm:text-xl order-2 sm:order-3'>||</span>
    <a
      href="/Buwaneka_Senarathne_cv.pdf"
      download
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 border-teal-300 text-teal-300 font-mono text-xs sm:text-sm rounded hover:bg-teal-300/10 transition-all duration-300 transform hover:-translate-y-1 order-4"
    >
      cv
    </a>
  </div>
</div>
      </div>
    </section>
  );
};

export default Projects;