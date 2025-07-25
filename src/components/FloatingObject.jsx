import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FloatingObject = ({ src, alt, delay = 1, size }) => {
  const getRandomPosition = () => {
    let top, left;

    do {
      top = Math.random() * 80 + 5;
      left = Math.random() * 90 + 5;
    } while (top > 35 && top < 65 && left > 35 && left < 65);

    return { top, left };
  };

  const [position, setPosition] = useState(getRandomPosition);
  const [direction] = useState({
    x: (Math.random() - 0.5) * 0.1,
    y: (Math.random() - 0.5) * 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newTop = prev.top + direction.y;
        let newLeft = prev.left + direction.x;

     
        if (newTop > 100) newTop = 0;
        if (newTop < 0) newTop = 100;
        if (newLeft > 100) newLeft = 0;
        if (newLeft < 0) newLeft = 100;


        if (newTop > 35 && newTop < 65 && newLeft > 35 && newLeft < 65) {
          return getRandomPosition();
        }

        return { top: newTop, left: newLeft };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);


  const imageSrc = src.startsWith("/assets/") ? src : `/assets/${src}`;

  return (
    <motion.img
      src={imageSrc}
      alt={alt}
      className={`absolute pointer-events-none z-10 ${size || "w-[80px] md:w-[100px]"}`}
      style={{
        top: `${position.top}vh`,
        left: `${position.left}vw`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay, duration: 1 }}
    />
  );
};

export default FloatingObject;
