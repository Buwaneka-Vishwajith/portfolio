import React, { useEffect, useState } from 'react';
import green from "/green.png";

const BubbleGenerator = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    generateBubbles();
  }, []);

  const generateBubbles = () => {
    const bubbleArray = Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 150 + 50,
      color: green, // Using green.png image
      animationDuration: Math.random() * 5 + 5, 
      animationDelay: Math.random() * 2, 
    }));
    setBubbles(bubbleArray);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 flex justify-center items-center ">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute rounded-full z-0"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: undefined,
            backgroundImage: `url(${bubble.color})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            left: `${bubble.left}%`,
            bottom: "0%", 
            animation: `floatUp ${bubble.animationDuration}s ease-in-out infinite`,
            animationDelay: `${bubble.animationDelay}s`,
          }}
        ></div>
      ))}

      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-200vh);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BubbleGenerator;