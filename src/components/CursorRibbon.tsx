import React, { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

interface StrandConfig {
  offsetDistance: number;
  idleAngle: number;
  idleRadius: number;
  color: (alpha: number) => string;
  glowColor: string;
  coreColor: string;
  width: number;
  glowSize: number;
}

const STRANDS_CONFIG: StrandConfig[] = [
  {
    offsetDistance: -24,
    idleAngle: 0,
    idleRadius: 18,
    color: (a) => `rgba(16, 185, 129, ${a * 0.75})`,
    glowColor: '#10b981',
    coreColor: 'rgba(255, 255, 255, 0.85)',
    width: 3.2,
    glowSize: 12
  },
  {
    offsetDistance: -12,
    idleAngle: (Math.PI * 2) / 5,
    idleRadius: 14,
    color: (a) => `rgba(34, 197, 94, ${a * 0.85})`,
    glowColor: '#22c55e',
    coreColor: 'rgba(255, 255, 255, 0.9)',
    width: 3.6,
    glowSize: 14
  },
  {
    offsetDistance: 0,
    idleAngle: (Math.PI * 4) / 5,
    idleRadius: 10,
    color: (a) => `rgba(74, 222, 128, ${a * 0.95})`,
    glowColor: '#4ade80',
    coreColor: '#ffffff',
    width: 4.0,
    glowSize: 16
  },
  {
    offsetDistance: 12,
    idleAngle: (Math.PI * 6) / 5,
    idleRadius: 14,
    color: (a) => `rgba(134, 239, 172, ${a * 0.85})`,
    glowColor: '#86efac',
    coreColor: 'rgba(255, 255, 255, 0.9)',
    width: 3.6,
    glowSize: 14
  },
  {
    offsetDistance: 24,
    idleAngle: (Math.PI * 8) / 5,
    idleRadius: 18,
    color: (a) => `rgba(5, 150, 105, ${a * 0.75})`,
    glowColor: '#059669',
    coreColor: 'rgba(255, 255, 255, 0.85)',
    width: 3.2,
    glowSize: 12
  }
];

export const CursorRibbon: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const MAX_POINTS = 30;
    const MAX_AGE = 45; // Frames before fading out completely

    // Independent point history for each of the 5 strands
    const strandTrails: TrailPoint[][] = STRANDS_CONFIG.map(() => []);

    const mouse = {
      x: -100,
      y: -100,
      lastX: -100,
      lastY: -100,
      vx: 0,
      vy: 0,
      isMoving: false
    };

    let idleTimer: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      mouse.isMoving = true;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        mouse.isMoving = false;
      }, 100);

      // Compute velocity vector
      let vx = 0;
      let vy = 0;
      let dist = 0;

      if (mouse.lastX > 0 && mouse.lastY > 0) {
        vx = currentX - mouse.lastX;
        vy = currentY - mouse.lastY;
        dist = Math.sqrt(vx * vx + vy * vy);
      }

      // Smooth normal vector perpendicular to direction of movement
      let nx = 0;
      let ny = 0;

      if (dist > 1.5) {
        // Perpendicular unit vector (-vy, vx)
        nx = -vy / dist;
        ny = vx / dist;
        mouse.vx = vx;
        mouse.vy = vy;
      } else {
        // Keep previous or default orientation
        nx = 0;
        ny = 1;
      }

      // Populate each of the 5 strands at its distinct separated offset
      STRANDS_CONFIG.forEach((strand, idx) => {
        const trail = strandTrails[idx];

        // Separation: Perpendicular offset when moving + subtle radial dispersion so they never merge
        const offsetX = nx * strand.offsetDistance + Math.cos(strand.idleAngle) * (strand.idleRadius * 0.5);
        const offsetY = ny * strand.offsetDistance + Math.sin(strand.idleAngle) * (strand.idleRadius * 0.5);

        const strandTargetX = currentX + offsetX;
        const strandTargetY = currentY + offsetY;

        // If mouse moved a noticeable distance, interpolate intermediate points for buttery smoothness
        if (mouse.lastX > 0 && mouse.lastY > 0 && dist > 4) {
          const steps = Math.min(Math.floor(dist / 6), 3);
          const prevStrandX = mouse.lastX + offsetX;
          const prevStrandY = mouse.lastY + offsetY;

          for (let s = 1; s <= steps; s++) {
            const t = s / (steps + 1);
            trail.unshift({
              x: prevStrandX + (strandTargetX - prevStrandX) * t,
              y: prevStrandY + (strandTargetY - prevStrandY) * t,
              age: 0
            });
          }
        }

        trail.unshift({
          x: strandTargetX,
          y: strandTargetY,
          age: 0
        });

        // Cap length
        if (trail.length > MAX_POINTS) {
          trail.length = MAX_POINTS;
        }
      });

      mouse.lastX = currentX;
      mouse.lastY = currentY;
      mouse.x = currentX;
      mouse.y = currentY;
    };

    const handleMouseLeave = () => {
      mouse.isMoving = false;
      mouse.lastX = -100;
      mouse.lastY = -100;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render each of the 5 distinct strands independently
      STRANDS_CONFIG.forEach((config, idx) => {
        const trail = strandTrails[idx];

        // Age points so they smoothly fade out when idle
        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].age += 1;
          if (trail[i].age > MAX_AGE) {
            trail.splice(i, 1);
          }
        }

        // Only draw if strand has at least 2 points
        if (trail.length >= 2) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';

          // Calculate current head opacity based on age
          const alpha = Math.max(0, 1 - trail[0].age / MAX_AGE);

          // Build smooth quadratic curve path
          ctx.beginPath();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.moveTo(trail[0].x, trail[0].y);

          for (let i = 0; i < trail.length - 1; i++) {
            const p0 = trail[i];
            const p1 = trail[i + 1];
            const midX = (p0.x + p1.x) / 2;
            const midY = (p0.y + p1.y) / 2;
            ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
          }

          // 1. Outer neon glow for this distinct strand
          ctx.lineWidth = config.width * 2.2;
          ctx.strokeStyle = config.color(alpha * 0.45);
          ctx.shadowColor = config.glowColor;
          ctx.shadowBlur = config.glowSize;
          ctx.stroke();

          // 2. Focused vibrant body
          ctx.lineWidth = config.width;
          ctx.strokeStyle = config.color(alpha);
          ctx.shadowColor = config.glowColor;
          ctx.shadowBlur = config.glowSize * 0.5;
          ctx.stroke();

          // 3. Bright core filament
          ctx.lineWidth = Math.max(1, config.width * 0.35);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 4;
          ctx.stroke();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      render();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (idleTimer) clearTimeout(idleTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // z-0 ensures the strands stay strictly behind all cards, text, and buttons
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full select-none"
      aria-hidden="true"
    />
  );
};
