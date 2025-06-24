import React, { useState, useRef, useEffect } from "react";

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef(null);
  const experienceRefs = useRef([]);

  const experiences = [
        {
      company: "###",
      position: "Software Engineer (Internship)",
      period: "### 2025 — ### 202#",
      description: [
        "###",
        "###",
        "###",
      ],
      technologies: [
        "###",
        "###",
        "###",
        "###",
        "###",
      ],
    },
    {
      company: "Airport & Aviation services Sri Lanka",
      position: "Mechatronics Engineer",
      period: "Jan 2023 — Mar 2023",
      description: [
        "Developed a 3D model of a two-way conveyor belt system using Solid Works to enhance baggage handling efficiency",
      ],
      technologies: ["Autocad", "Solid Works"],
    },
    {
      company: "Fiverr",
      position: "Video/Motion graphics designer",
      period: "2020 — 2021",
      description: [
        "Delivered 20+ professional video projects for international clients across various industries",
        "Crafted dynamic motion graphics and visual effects that elevated brand storytelling",
      ],
      technologies: ["After Effects", "Premiere Pro", "Photoshop"],
    },
  ];

  // Handle scroll to update active tab based on visible experience
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      let newActiveTab = 0;
      let minDistance = Infinity;

      experienceRefs.current.forEach((ref, index) => {
        if (ref) {
          // Get element position relative to the scroll container
          const elementTop = ref.offsetTop;
          const elementHeight = ref.offsetHeight;
          const elementCenter = elementTop + elementHeight / 2;
          const viewportCenter = scrollTop + containerHeight / 2;

          // Calculate distance from element center to viewport center
          const distance = Math.abs(elementCenter - viewportCenter);

          // The experience closest to viewport center becomes active
          if (distance < minDistance) {
            minDistance = distance;
            newActiveTab = index;
          }
        }
      });

      setActiveTab(newActiveTab);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Also call once on mount to set initial state
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Scroll to specific experience when tab is clicked
  const scrollToExperience = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      // Calculate approximate scroll position
      // Each experience is roughly 400px (min-height) + 48px (space-y-12 = 3rem = 48px)
      const approximateHeight = 448; // 400px + 48px spacing
      const scrollPosition = index * approximateHeight;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="experience"
      className="min-h-screen text-slate-400 pb-20 pr-16"
    >
      <div className="max-w-6xl">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-300 mb-4">
            <span class="text-purple-400">console</span>
            <span class="text-slate-300">.</span>
            <span class="text-blue-400">log</span>
            <span class="text-slate-300">(</span>
            <span class="text-teal-200">"Experience"</span>
            <span class="text-slate-300">)</span>
          </h2>
          <div className="w-16 h-0.5 bg-teal-300"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 h-[600px]">
          {/* Fixed Tab Navigation */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:w-64 flex-shrink-0">
            <div className="flex md:flex-col border-b-2 md:border-b-0 md:border-l-2 border-slate-700">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => scrollToExperience(index)}
                  className={`px-6 py-3 text-left whitespace-nowrap md:whitespace-normal transition-all duration-300 border-b-2 md:border-b-0 md:border-l-2 font-Inter tracking-widest text-sm ${
                    activeTab === index
                      ? "text-teal-300 border-teal-300 bg-teal-300/10"
                      : "text-slate-400 border-transparent hover:text-teal-300 hover:bg-slate-800/50"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pr-4 space-y-12 scroll-smooth relative"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#0f766e #1e293b",
            }}
          >
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => (experienceRefs.current[index] = el)}
                className={`min-h-[400px] pb-1 transition-all duration-300 ${
                  activeTab === index ? "opacity-100" : "opacity-70"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">
                    {exp.position}{" "}
                    <span className="text-teal-200">@ {exp.company}</span>
                  </h3>
                  <p className="font-mono text-sm text-slate-400 mb-6">
                    {exp.period}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {exp.description.map((item, descIndex) => (
                    <li key={descIndex} className="flex items-start">
                      <span className="text-teal-300 mr-3 mt-1 text-sm">▸</span>
                      <span className="text-slate-300 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <h4 className="text-slate-200 font-semibold mb-3">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-mono bg-teal-300/10 text-slate-300 rounded border border-teal-300/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Button */}
        {/* <div className="mt-16 text-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border-2 border-teal-300 text-teal-300 font-mono text-sm rounded hover:bg-teal-300/10 transition-all duration-300 transform hover:-translate-y-1"
          >
            View Full Resume
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Experience;
