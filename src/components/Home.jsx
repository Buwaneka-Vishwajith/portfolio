import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Bubble from "./Bubble";
import MouseGlow from "./MouseGlow";

//terminal
const MiniTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    { type: "w1", text: "H⠀⠀⠀⠀⠀⠆⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀" },
    { type: "w1", text: "E⠀⠀⠀⠀⠐⢀⡙⠴⢖⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀" },
    { type: "w1", text: "L⠀⠀⠀⠠⠀⠀⠀⣤⠘⢛⢻⣿⣧⣿⣿⣿⣿⣿⣿⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀" },
    { type: "w1", text: "L⠀⠀⠠⠆⣀⠁⠤⠄⣘⠊⠦⢴⣿⣿⠉⠉⠉⣹⣿⠟⠻⢿⣿⣦⡀⠀⠀⠀⠀" },
    { type: "w1", text: "O⠀⠀⠀⢀⠉⠤⠄⣈⡘⠐⢡⣿⣿⠇⠀⠀⢠⣿⡏⠀⠀⠀⢸⣿⠁⠀⠀⠀⠀" },
    { type: "w1", text: "⠀⠀⠀⡈⠠⠄⡈⠉⠽⠿⣿⣿⠿⠿⠿⣾⣿⣿⣤⣀⠀⣼⣿⡇⠀⠀⠀⠀⠀" },

    { type: "w2", text: "T⠰⠀⠀⠀⠶⠀⠀⠀⠁⢀⣿⣿⠁⠀⠀⢸⣿⠏⠹⢿⣿⣿⡿⠀⠀⠀⠀⠀⠀" },
    { type: "w2", text: "H⠀⠀⠋⣤⣄⣈⡈⠔⢰⣿⣿⠀⠀⠀⢠⣿⠃⠀⠀⠀⣼⣿⠃⠀⠀⠀⠀⠀⠀" },
    { type: "w2", text: "E⠀⠀⠀⠀⠘⠛⠿⠿⣿⣿⣿⣿⣷⣶⣿⣇⡀⠀⠀⣼⣿⠃⠀⠀⠀⠀⠀⠀⠀" },
    { type: "w2", text: "R⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠙⠛⠿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀" },
    { type: "w2", text: "E⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀" },
    { type: "w2", text: "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⠀⠀⠀⠀⠀⠀⠀" },
    { type: "system", text: 'Type "help" for commands' },
    { type: "prompt", text: "" },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPath] = useState("~/portfolio");
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const commands = {
    help: () => [
      {
        type: "error",
        text: "System Alert: Unauthorized access to an isolated node...",
      },
      {
        type: "success",
        text: "Absolutely nothing here. But hey, nice job finding the terminal.",
      },
      { type: "system", text: "Available commands:" },
      { type: "output", text: "  about    - About me" },
      { type: "output", text: "  ls       - List files" },
      { type: "output", text: "  cv - Download resume.pdf" },
    ],
    cv: () => {
      const link = document.createElement("a");
      link.href = "/Buwaneka_Senarathne_cv.pdf";
      link.download = "Buwaneka_Vishwajith_CV.pdf";
      link.click();

      return [
        { type: "output", text: "Downloading CV.pdf..." },
        { type: "success", text: "✓ Done!" },
      ];
    },
    clear: () => {
      setOutput([{ type: "prompt", text: "" }]);
      return [];
    },
    about: () => [
      { type: "output", text: "Buwaneka Vishwajith" },
      { type: "output", text: "Fullstack Engineer" },
      { type: "output", text: "Code with purpose. Design with precision." },
    ],
    ls: () => [
      { type: "output", text: "buwaneka/" },
      { type: "output", text: "├── About.jsx" },
      { type: "output", text: "├── Experience.jsx" },
      { type: "output", text: "├── Projects.jsx" },
    ],
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return [];

    if (commands[trimmedCmd]) {
      return commands[trimmedCmd]();
    } else {
      return [
        { type: "error", text: `Command not found: ${trimmedCmd}` },
        { type: "output", text: 'Type "help" for available commands' },
      ];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOutput = [
      ...output.slice(0, -1),
      { type: "command", text: `${currentPath}$ ${input}` },
      ...executeCommand(input),
      { type: "prompt", text: "" },
    ];

    setOutput(newOutput);
    setInput("");
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case "system":
        return "text-blue-400";
      case "command":
        return "text-white";
      case "output":
        return "text-purple-300";
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "prompt":
        return "text-white";
      case "w1":
        return "text-teal-200";
      case "w3":
        return "text-yellow-400/50";
      case "w2":
        return "text-cyan-500";
      case "w4":
        return "text-lime-500/50";
      default:
        return "text-gray-300";
    }
  };

  return (
    <motion.div
      className={`bg-gray-900 rounded-lg shadow-2xl overflow-hidden font-mono text-xs transition-all duration-300 w-full max-w-md ${
        isExpanded ? "h-80" : "h-64"
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-3 py-2 flex items-center justify-center relative">
        <div className="flex space-x-1.5 absolute left-3">
          <button className="w-2.5 h-2.5 bg-purple-400 rounded-full hover:bg-red-400 transition-colors"></button>
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-teal-400 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-xs">terminal</div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors absolute right-3"
        ></button>
      </div>

      {/* Terminal Body */}
      <div
        className={`bg-neutral-900 p-3 overflow-y-auto cursor-text transition-all duration-300 terminal-scrollbar ${
          isExpanded ? "h-64" : "h-48"
        }`}
        onClick={focusInput}
        ref={outputRef}
      >
        {output.map((line, index) => (
          <div
            key={index}
            className={`${getTextColor(line.type)} leading-relaxed`}
          >
            {line.type === "prompt" && index === output.length - 1 ? (
              <div className="flex items-center">
                <span className="text-teal-300 text-xs">~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                  className="bg-transparent text-white outline-none flex-1 ml-1 text-xs"
                  spellCheck="false"
                />
                <span className="animate-pulse text-white">_</span>
              </div>
            ) : (
              <div className="text-xs">{line.text}</div>
            )}
          </div>
        ))}
      </div>

      {/* Terminal Footer */}
      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400/60 flex justify-center">
        <span className="text-center">Surely this terminal does more than just sit here... right?</span>
      </div>
    </motion.div>
  );
};

// Custom hook for scroll reveal animations
const useScrollReveal = () => {
  return {
    initial: { opacity: 0, y: 75 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };
};

// Wrapper component for scroll-triggered animations
const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = {
    up: { y: 75 },
    down: { y: -75 },
    left: { x: 75 },
    right: { x: -75 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Enhanced section wrapper with staggered animations
const AnimatedSection = ({ children, id, stagger = false }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        id={id}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("about");
  const { scrollYProgress } = useScroll();

  // Parallax effect for sidebar background
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-slate-300">
      <MouseGlow />
      
      {/* Desktop Layout (lg and up) */}
      <div className="lg:flex hidden">
        {/* Left Sidebar - Static with parallax background */}
        <div className="w-2/5 min-h-screen fixed left-0 top-0 flex flex-col justify-between px-16 py-16 bg-gray-900 overflow-hidden">
          {/* Animated Bubble Background */}
          <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
            <Bubble />
          </motion.div>

          {/* Blur overlay */}
          <div className="absolute inset-0 z-5 backdrop-blur-sm bg-slate-900/20"></div>

          {/* Main Content */}
          <motion.div
            className="max-w-md relative z-10"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Header Info */}
            <div className="mb-8 sm:mb-12">
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-200 mb-1 leading-tight whitespace-nowrap"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Buwaneka Vishwajith
              </motion.h1>

              <motion.h2
                className="text-lg sm:text-xl font-semibold text-slate-300 mb-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Fullstack Engineer
              </motion.h2>

              <motion.p
                className="text-sm sm:text-md text-slate-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Code with <b>purpose</b>. Design with <b>precision</b>.
              </motion.p>
            </div>

            {/* Navigation with staggered animation */}
            <motion.nav
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.8,
                  },
                },
              }}
            >
              {[
                { id: "about", label: "Me" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center group text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-slate-200"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`h-px bg-slate-600 transition-all duration-300 mr-4 ${
                      activeSection === item.id
                        ? "w-16 bg-slate-200"
                        : "w-8 group-hover:w-12 group-hover:bg-slate-400"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: activeSection === item.id ? 64 : 32 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span
                    className={`text-sm uppercase font-Inter tracking-wide ${
                      activeSection === item.id
                        ? "font-bold text-teal-200"
                        : "group-hover:translate-x-1"
                    } transition-transform duration-300`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </motion.nav>

            {/* Social Links with bounce animation */}
            <motion.div
              className="mt-12 flex space-x-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.2,
                  },
                },
              }}
            >
              <motion.a
                href="https://github.com/Buwaneka-Vishwajith"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
                aria-label="GitHub"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/buwaneka-vishwajith-645378206/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
                aria-label="LinkedIn"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>

              <motion.a
                href="https://medium.com/@buwaneka10000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
                aria-label="Medium"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </motion.a>

              <motion.a
                href="mailto:buwaneka10000@gmail.com"
                className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
                aria-label="Email"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Terminal Component - Bottom Left */}
          <div className="relative z-10 mt-9">
            <MiniTerminal />
          </div>
        </div>

        {/* Right Content - Scrollable with reveal animations */}
        <div className="w-3/5 ml-auto">
          <div className="pl-8">
            <ScrollReveal>
              <AnimatedSection id="about">
                <About />
              </AnimatedSection>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <AnimatedSection id="experience" stagger={true}>
                <Experience />
              </AnimatedSection>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="left">
              <AnimatedSection id="projects" stagger={true}>
                <Projects />
              </AnimatedSection>
            </ScrollReveal>
          </div>

          {/* Footer */}
          <motion.footer
            className="w-full bg-gray-900 border-t border-slate-700/50 py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-slate-400 text-xs mb-1">
                Built and designed by{" "}
                <span className="text-slate-300/60 text-xs">
                  Buwaneka Vishwajith
                </span>
              </p>
              <p className="text-slate-500 text-xs">All rights reserved. ©</p>
            </div>
          </motion.footer>
        </div>
      </div>

      {/* Mobile/Tablet Layout (below lg) */}
      <div className="lg:hidden">
        {/* Mobile Header Section */}
        <div className="min-h-screen bg-gray-900 relative overflow-hidden">
        <MouseGlow />
        
        {/* Animated Bubble Background for Mobile */}
        <div className="absolute inset-0 z-0">
          <Bubble />
        </div>

        {/* Blur overlay for Mobile */}
        <div className="absolute inset-0 z-5 backdrop-blur-sm bg-slate-900/20"></div>

        {/* Mobile Content Container */}
        <div className="relative z-10 px-6 py-16 flex flex-col justify-center items-center text-center">
          {/* Header Info - Mobile */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-slate-200 mb-2 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Buwaneka Vishwajith
            </motion.h1>

            <motion.h2
              className="text-xl sm:text-2xl font-semibold text-slate-300 mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fullstack Engineer
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Code with <b>purpose</b>. Design with <b>precision</b>.
            </motion.p>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.nav
            className="space-y-6 mb-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.8,
                },
              },
            }}
          >
            {[
              { id: "about", label: "Me" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-center py-3 px-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 text-slate-300 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm uppercase font-Inter tracking-wide">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </motion.nav>

          {/* Mobile Social Links */}
          <motion.div
            className="flex space-x-8 mb-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1.2,
                },
              },
            }}
          >
            <motion.a
              href="https://github.com/Buwaneka-Vishwajith"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
              aria-label="GitHub"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/buwaneka-vishwajith-645378206/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
              aria-label="LinkedIn"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://medium.com/@buwaneka10000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
              aria-label="Medium"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 24 24"
                role="img"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </motion.a>

            <motion.a
              href="mailto:buwaneka10000@gmail.com"
              className="text-slate-400 hover:text-teal-300 transition-colors duration-300"
              aria-label="Email"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Mobile Terminal */}
          <div className="w-full max-w-sm">
            <MiniTerminal />
          </div>
        </div>
      </div>

      {/* Mobile Content Sections */}
      <div className="lg:hidden px-6">
        <ScrollReveal>
          <AnimatedSection id="about">
            <About />
          </AnimatedSection>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <AnimatedSection id="experience" stagger={true}>
            <Experience />
          </AnimatedSection>
        </ScrollReveal>

        <ScrollReveal delay={0.4} direction="left">
          <AnimatedSection id="projects" stagger={true}>
            <Projects />
          </AnimatedSection>
        </ScrollReveal>

        {/* Mobile Footer */}
        <motion.footer
          className="w-full bg-gray-900 border-t border-slate-700/50 py-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 text-sm mb-2">
              Built and designed by{" "}
              <span className="text-slate-300/60 text-sm">
                Buwaneka Vishwajith
              </span>
            </p>
            <p className="text-slate-500 text-sm">All rights reserved. ©</p>
          </div>
        </motion.footer>
      </div>
    </div>
    </div>
  );
};

export default Home;