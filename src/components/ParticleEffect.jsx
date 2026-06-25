import { useEffect, useRef } from 'react';
import './ParticleEffect.css';

const ParticleEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuración del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80; // Altura del header
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuración de partículas
    const particles = [];
    const particleCount = 15;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = `rgba(106, 170, 80, ${this.opacity})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en bordes
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Variación de opacidad sutil
        this.opacity += (Math.random() - 0.5) * 0.01;
        this.opacity = Math.max(0.05, Math.min(0.4, this.opacity));
        this.color = `rgba(106, 170, 80, ${this.opacity})`;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }}
    />
  );
};

export default ParticleEffect;
