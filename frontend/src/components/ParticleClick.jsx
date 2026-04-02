import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Creates a fun explosion of pet-themed particles (paws, bones, hearts)
const ParticleClick = ({ children }) => {
  const [particles, setParticles] = useState([]);

  const handleClick = (e) => {
    // Determine click position relative to the button wrapper
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create 5 new particles
    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      // Random direction for explosion
      vx: (Math.random() - 0.5) * 60,
      vy: (Math.random() - 1) * 60 - 20,
      icon: ['🐾', '🦴', '❤️', '😻'][Math.floor(Math.random() * 4)],
      rotation: Math.random() * 360,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean them up after animation completes
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1000);
  };

  return (
    <div className="relative inline-block" onClick={handleClick}>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 0.5, rotate: p.rotation }}
            animate={{ 
              x: p.x + p.vx, 
              y: p.y + p.vy, 
              opacity: 0, 
              scale: 1.5,
              rotate: p.rotation + 180 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none text-xl z-50 select-none"
            style={{ 
              textShadow: '0 0 10px rgba(255,107,107,0.5)',
              transformOrigin: 'center'
            }}
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default ParticleClick;
