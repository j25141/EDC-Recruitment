import React, { useEffect, useRef } from 'react';

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface StrandConfig {
  offsetDistance: number;
  idleAngle: number;
  idleRadius: number;
  color: (alpha: number) => string;
  glowColor: string;
  width: number;
  glowSize: number;
  spring: number;
  friction: number;
}

const STRANDS_CONFIG: StrandConfig[] = [
  {
    offsetDistance: -22,
    idleAngle: 0,
    idleRadius: 16,
    color: (a) => `rgba(16, 185, 129, ${a * 0.75})`,
    glowColor: '#10b981',
    width: 3.2,
    glowSize: 12,
    spring: 0.28,
    friction: 0.72
  },
  {
    offsetDistance: -11,
    idleAngle: (Math.PI * 2) / 5,
    idleRadius: 12,
    color: (a) => `rgba(34, 197, 94, ${a * 0.85})`,
    glowColor: '#22c55e',
    width: 3.5,
    glowSize: 14,
    spring: 0.29,
    friction: 0.71
  },
  {
    offsetDistance: 0,
    idleAngle: (Math.PI * 4) / 5,
    idleRadius: 8,
    color: (a) => `rgba(74, 222, 128, ${a * 0.95})`,
    glowColor: '#4ade80',
    width: 3.8,
    glowSize: 16,
    spring: 0.31,
    friction: 0.70
  },
  {
    offsetDistance: 11,
    idleAngle: (Math.PI * 6) / 5,
    idleRadius: 12,
    color: (a) => `rgba(134, 239, 172, ${a * 0.85})`,
    glowColor: '#86efac',
    width: 3.5,
    glowSize: 14,
    spring: 0.29,
    friction: 0.71
  },
  {
    offsetDistance: 22,
    idleAngle: (Math.PI * 8) / 5,
    idleRadius: 16,
    color: (a) => `rgba(5, 150, 105, ${a * 0.75})`,
    glowColor: '#059669',
    width: 3.2,
    glowSize: 12,
    spring: 0.28,
    friction: 0.72
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

    const NODES_PER_STRAND = 26;

    // Mouse state
    const mouse = {
      x: -100,
      y: -100,
      targetX: -100,
      targetY: -100,
      vx: 0,
      vy: 0,
      nx: 0,
      ny: 1,
      targetNx: 0,
      targetNy: 1,
      isMoving: false,
      opacity: 0
    };

    // Initialize 5 independent fluid node chains
    const strandsNodes: NodePoint[][] = STRANDS_CONFIG.map(() =>
      Array.from({ length: NODES_PER_STRAND }, () => ({
        x: -100,
        y: -100,
        vx: 0,
        vy: 0
      }))
    );

    let idleTimeout: NodeJS.Timeout | null = null;
    let initialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      const curX = e.clientX;
      const curY = e.clientY;

      if (!initialized) {
        mouse.x = curX;
        mouse.y = curY;
        mouse.targetX = curX;
        mouse.targetY = curY;

        // Initialize all strand nodes at cursor position
        STRANDS_CONFIG.forEach((strand, sIdx) => {
          strandsNodes[sIdx].forEach((node) => {
            node.x = curX + strand.offsetDistance;
            node.y = curY;
          });
        });
        initialized = true;
      }

      const dx = curX - mouse.targetX;
      const dy = curY - mouse.targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1.5) {
        // Smooth perpendicular normal vector
        mouse.targetNx = -dy / dist;
        mouse.targetNy = dx / dist;
      }

      mouse.targetX = curX;
      mouse.targetY = curY;
      mouse.isMoving = true;

      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        mouse.isMoving = false;
      }, 120);
    };

    const handleMouseLeave = () => {
      mouse.isMoving = false;
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

      // Smoothly fade in when moving, and gently fade out when idle
      if (mouse.isMoving) {
        mouse.opacity = Math.min(1, mouse.opacity + 0.12);
      } else {
        mouse.opacity = Math.max(0, mouse.opacity - 0.035);
      }

      // Buttery smooth lerping for mouse position and normal vector
      mouse.x += (mouse.targetX - mouse.x) * 0.35;
      mouse.y += (mouse.targetY - mouse.y) * 0.35;

      mouse.nx += (mouse.targetNx - mouse.nx) * 0.18;
      mouse.ny += (mouse.targetNy - mouse.ny) * 0.18;

      // Normalize smoothed normal vector
      const nLen = Math.sqrt(mouse.nx * mouse.nx + mouse.ny * mouse.ny);
      const nx = nLen > 0.001 ? mouse.nx / nLen : 0;
      const ny = nLen > 0.001 ? mouse.ny / nLen : 1;

      // Only simulate and draw if opacity is visible
      if (mouse.opacity > 0.01 && mouse.x > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        STRANDS_CONFIG.forEach((strand, sIdx) => {
          const nodes = strandsNodes[sIdx];

          // Compute target position for the head node of this strand
          const offsetX = nx * strand.offsetDistance + Math.cos(strand.idleAngle) * (strand.idleRadius * 0.35);
          const offsetY = ny * strand.offsetDistance + Math.sin(strand.idleAngle) * (strand.idleRadius * 0.35);

          const targetHeadX = mouse.x + offsetX;
          const targetHeadY = mouse.y + offsetY;

          // Head node glides toward target with high-precision spring
          nodes[0].vx = (nodes[0].vx + (targetHeadX - nodes[0].x) * strand.spring) * strand.friction;
          nodes[0].vy = (nodes[0].vy + (targetHeadY - nodes[0].y) * strand.spring) * strand.friction;
          nodes[0].x += nodes[0].vx;
          nodes[0].y += nodes[0].vy;

          // Each trailing node follows the previous node with smooth fluid inertia
          for (let i = 1; i < NODES_PER_STRAND; i++) {
            const prev = nodes[i - 1];
            const curr = nodes[i];

            // Soft progressive damping creates a silky trailing wave
            const chainSpring = strand.spring * (1 - (i / NODES_PER_STRAND) * 0.35);
            curr.vx = (curr.vx + (prev.x - curr.x) * chainSpring) * strand.friction;
            curr.vy = (curr.vy + (prev.y - curr.y) * chainSpring) * strand.friction;
            curr.x += curr.vx;
            curr.y += curr.vy;
          }

          // Render fluid Catmull-Rom spline with smooth tapering
          ctx.beginPath();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.moveTo(nodes[0].x, nodes[0].y);

          for (let i = 0; i < NODES_PER_STRAND - 1; i++) {
            const xc = (nodes[i].x + nodes[i + 1].x) / 2;
            const yc = (nodes[i].y + nodes[i + 1].y) / 2;
            ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
          }

          // 1. Soft atmospheric neon glow
          ctx.lineWidth = strand.width * 2.4;
          ctx.strokeStyle = strand.color(mouse.opacity * 0.45);
          ctx.shadowColor = strand.glowColor;
          ctx.shadowBlur = strand.glowSize;
          ctx.stroke();

          // 2. Focused luminous strand body
          ctx.lineWidth = strand.width;
          ctx.strokeStyle = strand.color(mouse.opacity * 0.95);
          ctx.shadowColor = strand.glowColor;
          ctx.shadowBlur = strand.glowSize * 0.5;
          ctx.stroke();

          // 3. Ultra-fine bright highlight
          ctx.lineWidth = Math.max(1, strand.width * 0.32);
          ctx.strokeStyle = `rgba(255, 255, 255, ${mouse.opacity * 0.85})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 3;
          ctx.stroke();
        });

        ctx.restore();
      }

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
      if (idleTimeout) clearTimeout(idleTimeout);
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
