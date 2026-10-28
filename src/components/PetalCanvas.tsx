import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayAmount: number;
  opacity: number;
  colorType: 'deep' | 'blush' | 'dusty' | 'gold';
  flip: number;
  flipSpeed: number;
}

export const PetalCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !active) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle count: 18 on small screens, 32 on large
    const petalCount = window.innerWidth < 768 ? 16 : 30;
    const petals: Petal[] = [];

    const colorMap = {
      deep: 'rgba(158, 42, 68, ',     // cherry rose
      blush: 'rgba(247, 182, 192, ',   // soft blush pink
      dusty: 'rgba(214, 138, 148, ',   // dusty rose
      gold: 'rgba(212, 175, 55, ',     // subtle champagne petal highlight
    };

    const createPetal = (startY?: number): Petal => {
      const types: ('deep' | 'blush' | 'dusty' | 'gold')[] = ['deep', 'blush', 'dusty', 'dusty', 'blush', 'gold'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 0.7 + 0.4,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmount: Math.random() * 1.5 + 0.5,
        opacity: chosenType === 'gold' ? Math.random() * 0.35 + 0.2 : Math.random() * 0.45 + 0.35,
        colorType: chosenType,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
      };
    };

    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal());
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(tick * p.swaySpeed) * p.swayAmount + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Wrap around bottom
        if (p.y > height + 20) {
          petals[i] = createPetal(-20);
          continue;
        }
        // Wrap around edges
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(1, Math.sin(p.flip));

        // Draw organic petal curve
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 4, p.size * 0.8, p.size * 0.6);
        ctx.bezierCurveTo(p.size * 0.6, p.size * 1.1, -p.size * 0.2, p.size, 0, 0);

        ctx.fillStyle = `${colorMap[p.colorType]}${p.opacity})`;
        ctx.fill();

        // Subtle petal spine / vein highlight
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.35})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(p.size * 0.3, p.size * 0.3, p.size * 0.6, p.size * 0.6);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 select-none"
      aria-hidden="true"
    />
  );
};

