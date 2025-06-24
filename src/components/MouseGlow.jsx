import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations for smooth following
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select, .cursor-pointer, .group');
      setIsHovering(isInteractive);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 }
        }}
      >
        {/* Outer glow */}
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* <div className="w-98 h-98 bg-amber-50 rounded-full blur-md opacity-90" /> */}
          <div className="w-8 h-8 bg-teal-400 rounded-full blur-md opacity-30" />
        </div>

      </motion.div>

      {/* Inner cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 }
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-blue-400 rounded-full" />
        </div>
      </motion.div>

      {/* Large ambient glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isVisible ? 0.1 : 0,
        }}
        transition={{
          scale: { duration: 0.3 },
          opacity: { duration: 0.3 }
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 bg-teal-400 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </>
  );
};

export default MouseGlow;