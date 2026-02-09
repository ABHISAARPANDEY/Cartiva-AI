import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

interface ParticlesBackgroundProps {
  className?: string;
  /** Approximate number of particles on a desktop viewport */
  density?: number;
}

/**
 * Lightweight canvas-based particle background optimized for hero sections.
 * - Soft, slow-moving particles that subtly suggest a network/signal field.
 * - Automatically adapts to container size and device pixel ratio.
 */
export function ParticlesBackground({
  className = "",
  density = 48
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.clientWidth * dpr;
    let height = canvas.clientHeight * dpr;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const baseCount = density;
    const areaFactor = (width * height) / (1440 * 900); // scale with viewport
    // Slightly denser than before so the network is clearly visible
    const count = Math.min(140, Math.max(35, Math.floor(baseCount * 1.4 * areaFactor)));

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < count; i++) {
      particles.push({
        x: random(0, width),
        y: random(0, height),
        // much faster base motion for a more energetic field
        vx: random(-1.1, 1.1),
        vy: random(-0.9, 0.9),
        radius: random(1.6 * dpr, 3.4 * dpr),
        alpha: random(0.55, 0.9)
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let hasMouse = false;

    function draw() {
      context.clearRect(0, 0, width, height);

      // soft gradient background hint
      context.fillStyle = "rgba(15, 23, 42, 1)"; // solid deep navy
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";

      // draw lines between nearby particles (network effect)
      const maxDistance = Math.min(width, height) * 0.25;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const opacity = 0.4 * (1 - dist / maxDistance);
            context.beginPath();
            context.strokeStyle = `rgba(56, 189, 248, ${opacity})`; // bright cyan-blue
            context.lineWidth = 0.8 * dpr;
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // light mouse repulsion for interactivity
        if (hasMouse) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const influenceRadius = Math.min(width, height) * 0.35;
          if (dist < influenceRadius) {
            const force = (influenceRadius - dist) / influenceRadius;
            // very strong mouse influence
            p.vx += (dx / dist) * force * 0.12;
            p.vy += (dy / dist) * force * 0.12;
          }
        }

        context.beginPath();
        context.fillStyle = `rgba(96, 165, 250, ${p.alpha})`; // bright blue nodes
        context.arc(p.x, p.y, p.radius * 1.4, 0, Math.PI * 2);
        context.fill();
      });

      // extra highlight around mouse cursor
      if (hasMouse) {
        const mouseRadius = Math.min(width, height) * 0.32;
        particles.forEach((p) => {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const opacity = 0.6 * (1 - dist / mouseRadius);
            context.beginPath();
            context.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            context.lineWidth = 1.3 * dpr;
            context.moveTo(mouseX, mouseY);
            context.lineTo(p.x, p.y);
            context.stroke();
          }
        });
      }

      context.globalCompositeOperation = "source-over";
    }

    function loop() {
      draw();
      animationFrameRef.current = requestAnimationFrame(loop);
    }

    animationFrameRef.current = requestAnimationFrame(loop);

    function handleResize() {
      width = canvas.clientWidth * dpr;
      height = canvas.clientHeight * dpr;
      canvas.width = width;
      canvas.height = height;
    }

    function handleMouseMove(event: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseX = (event.clientX - rect.left) * dpr;
      mouseY = (event.clientY - rect.top) * dpr;
      hasMouse = true;
    }

    function handleMouseLeave() {
      hasMouse = false;
    }

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 opacity-100 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

