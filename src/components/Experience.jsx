import React, { useState, useRef, useEffect } from "react";

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef(null);
  const experienceRefs = useRef([]);
  const isScrollingRef = useRef(false);

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

  // S-curve easing function (ease-in-out)
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Custom smooth scroll with S-curve easing
  const smoothScrollTo = (targetPosition, duration = 800) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    isScrollingRef.current = true;

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply S-curve easing
      const easedProgress = easeInOutCubic(progress);
      const currentPosition = startPosition + (distance * easedProgress);
      
      container.scrollTop = currentPosition;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isScrollingRef.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Handle scroll to update active tab based on visible experience
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current || isScrollingRef.current) return;

      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      let newActiveTab = 0;
      let minDistance = Infinity;

      experienceRefs.current.forEach((ref, index) => {
        if (ref) {
          const elementTop = ref.offsetTop;
          const elementHeight = ref.offsetHeight;
          const elementCenter = elementTop + elementHeight / 2;
          const viewportCenter = scrollTop + containerHeight / 2;

          const distance = Math.abs(elementCenter - viewportCenter);

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
      container.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Scroll to specific experience when tab is clicked with smooth S-curve
  const scrollToExperience = (index) => {
    if (!scrollContainerRef.current || !experienceRefs.current[index]) return;

    const container = scrollContainerRef.current;
    const targetElement = experienceRefs.current[index];
    
    // Calculate the exact position of the target element
    const containerRect = container.getBoundingClientRect();
    const elementRect = targetElement.getBoundingClientRect();
    const containerTop = container.scrollTop;
    
    // Position the element in the center of the viewport
    const targetPosition = containerTop + (elementRect.top - containerRect.top) - 
                          (container.clientHeight / 2) + (targetElement.offsetHeight / 2);
    
    // Use custom smooth scroll with longer duration for more seamless feel
    smoothScrollTo(Math.max(0, targetPosition), 1000);
  };

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && activeTab > 0) {
        e.preventDefault();
        scrollToExperience(activeTab - 1);
      } else if (e.key === 'ArrowDown' && activeTab < experiences.length - 1) {
        e.preventDefault();
        scrollToExperience(activeTab + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, experiences.length]);

  return (
    <section
      id="experience"
      className="min-h-screen text-slate-400 pb-20 pr-16"
    >
      <div className="max-w-6xl">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-300 mb-4">
            <span className="text-purple-400">console</span>
            <span className="text-slate-300">.</span>
            <span className="text-blue-400">log</span>
            <span className="text-slate-300">(</span>
            <span className="text-teal-200">"Experience"</span>
            <span className="text-slate-300">)</span>
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
                  className={`px-6 py-3 text-left whitespace-nowrap md:whitespace-normal transition-all duration-500 ease-out border-b-2 md:border-b-0 md:border-l-2 font-Inter tracking-widest text-sm transform hover:scale-105 ${
                    activeTab === index
                      ? "text-teal-300 border-teal-300 bg-teal-300/10 shadow-lg"
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
            className="flex-1 overflow-y-auto pr-4 space-y-12 relative"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#0f766e #1e293b",
              scrollBehavior: "auto", // Disable native smooth scroll since we're using custom
            }}
          >
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => (experienceRefs.current[index] = el)}
                className={`min-h-[400px] pb-1 transition-all duration-700 ease-out transform ${
                  activeTab === index 
                    ? "opacity-100 scale-100" 
                    : "opacity-70 scale-95"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-300 mb-2 transition-colors duration-300">
                    {exp.position}{" "}
                    <span className="text-teal-200">@ {exp.company}</span>
                  </h3>
                  <p className="font-mono text-sm text-slate-400 mb-6">
                    {exp.period}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {exp.description.map((item, descIndex) => (
                    <li key={descIndex} className="flex items-start group">
                      <span className="text-teal-300 mr-3 mt-1 text-sm transition-transform duration-300 group-hover:scale-110">▸</span>
                      <span className="text-slate-300 leading-relaxed transition-colors duration-300 group-hover:text-slate-200">
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
                        className="px-3 py-1 text-xs font-mono bg-teal-300/10 text-slate-300 rounded border border-teal-300/20 transition-all duration-300 hover:bg-teal-300/20 hover:border-teal-300/40 hover:scale-105"
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