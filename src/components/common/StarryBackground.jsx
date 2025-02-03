import React, { useEffect, useRef } from 'react';

const StarryBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();

    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5,
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isDarkMode ? '#000' : '#e6f2ff';
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? '#fff' : '#ff668a';
        ctx.fill();
        star.y += star.speed;

        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      requestAnimationFrame(drawStars);
    };

    drawStars();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(drawStars);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default StarryBackground;