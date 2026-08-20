import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  isFinalStage?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  opacitySpeed: number;
  type: 'heart' | 'star' | 'butterfly' | 'orb';
  color: string;
  rotation: number;
  rotSpeed: number;
  scale: number;
  pulse: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ isFinalStage = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle colors in Blush Pink, Soft Lavender, Cream, Rose
    const particleColors = [
      'rgba(244, 114, 182, 0.6)', // Pink
      'rgba(192, 132, 252, 0.6)', // Lavender
      'rgba(251, 207, 232, 0.7)', // Blush
      'rgba(244, 63, 94, 0.5)',   // Rose
      'rgba(255, 241, 242, 0.8)', // Cream White
    ];

    const particleCount = isFinalStage ? 45 : 30;
    const particles: Particle[] = [];

    const createParticle = (overrideY?: number): Particle => {
      const types: Array<'heart' | 'star' | 'butterfly' | 'orb'> = ['heart', 'star', 'star', 'orb', 'heart', 'butterfly'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      return {
        x: Math.random() * width,
        y: overrideY !== undefined ? overrideY : Math.random() * height,
        size: type === 'orb' ? 40 + Math.random() * 80 : 8 + Math.random() * 16,
        speedY: -(0.2 + Math.random() * 0.5),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.2,
        opacitySpeed: (Math.random() - 0.5) * 0.008,
        type,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        scale: 0.8 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Helper functions to draw canvas shapes nicely
    const drawHeart = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.3)
        );
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawButterfly = (ctx: CanvasRenderingContext2D, size: number, pulse: number) => {
      ctx.beginPath();
      const wingFlap = Math.sin(pulse * 3) * 0.4 + 0.8;
      // Left Wing
      ctx.ellipse(-size * 0.4, 0, size * 0.5 * wingFlap, size * 0.35, Math.PI / 6, 0, Math.PI * 2);
      ctx.ellipse(-size * 0.3, size * 0.3, size * 0.35 * wingFlap, size * 0.25, -Math.PI / 6, 0, Math.PI * 2);
      // Right Wing
      ctx.ellipse(size * 0.4, 0, size * 0.5 * wingFlap, size * 0.35, -Math.PI / 6, 0, Math.PI * 2);
      ctx.ellipse(size * 0.3, size * 0.3, size * 0.35 * wingFlap, size * 0.25, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.pulse) * 0.2;
        p.pulse += 0.03;
        p.opacity += p.opacitySpeed;

        if (p.opacity > 0.85 || p.opacity < 0.15) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        p.rotation += p.rotSpeed;

        if (p.type === 'orb') {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.05, Math.min(1, p.opacity));

          if (p.type === 'heart') {
            drawHeart(ctx, p.size * p.scale);
          } else if (p.type === 'star') {
            drawStar(ctx, p.size * p.scale);
          } else if (p.type === 'butterfly') {
            drawButterfly(ctx, p.size * p.scale, p.pulse);
          }
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFinalStage]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
