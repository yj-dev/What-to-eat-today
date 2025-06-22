'use client';

import { useEffect, useState } from 'react';

interface ConfettiProps {
  isActive: boolean;
  onComplete: () => void;
  centerX: number;
  centerY: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
}

const colors = ['#FF6B35', '#FFD23F', '#6C5CE7', '#74B9FF', '#00B894', '#E17055', '#FD79A8', '#FDCB6E'];

export default function Confetti({ isActive, onComplete, centerX, centerY }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    // 创建粒子 - 从中心点向四周喷射
    const newParticles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = Math.random() * 10 + 8; // 更快的初始速度
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      newParticles.push({
        id: i,
        x: centerX,
        y: centerY,
        vx,
        vy,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        life: 0,
        maxLife: 80 + Math.random() * 40, // 生命周期
      });
    }
    setParticles(newParticles);

    // 动画循环 - 使用requestAnimationFrame获得更流畅的动画
    let animationId: number;
    
    const animate = () => {
      setParticles(prev => {
        const updated = prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.97, // 空气阻力
          vy: particle.vy * 0.97 + 0.4, // 重力
          rotation: particle.rotation + particle.rotationSpeed,
          life: particle.life + 1,
        })).filter(particle => particle.life < particle.maxLife);

        if (updated.length === 0) {
          setTimeout(onComplete, 100);
          return [];
        }

        return updated;
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isActive, onComplete, centerX, centerY]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => {
        const opacity = Math.max(0, 1 - particle.life / particle.maxLife);
        return (
          <div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: particle.x - 6,
              top: particle.y - 6,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
}