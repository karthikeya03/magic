import { useEffect, useState, useCallback } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

let sparkleId = 0;

const SparkleTrail = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = useCallback((e: MouseEvent) => {
    const colors = [
      "hsl(340, 82%, 65%)",
      "hsl(350, 90%, 72%)",
      "hsl(340, 82%, 52%)",
      "hsl(40, 80%, 60%)",
      "hsl(330, 80%, 75%)",
    ];
    const id = sparkleId++;
    const sparkle: Sparkle = {
      id,
      x: e.clientX + (Math.random() - 0.5) * 20,
      y: e.clientY + (Math.random() - 0.5) * 20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setSparkles((prev) => [...prev.slice(-30), sparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttled = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 40) {
        lastTime = now;
        addSparkle(e);
      }
    };
    window.addEventListener("mousemove", throttled);
    return () => window.removeEventListener("mousemove", throttled);
  }, [addSparkle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute animate-sparkle-trail"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            borderRadius: "50%",
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default SparkleTrail;
