import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const scratchCards = [
  { message: "You're the love of my life", emoji: "💖" },
  { message: "I'd choose you in every lifetime", emoji: "🌟" },
  { message: "You make my heart go brrr", emoji: "💓" },
  { message: "Kitty, you're irreplaceable", emoji: "🐱" },
  { message: "My biggest flex is you ", emoji: "💕" },
  { message: "You + Me = Forever", emoji: "♾️" },
];

const ScratchCard = ({
  message,
  emoji,
  index,
}: {
  message: string;
  emoji: string;
  index: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const scratchCountRef = useRef(0);

  const scratch = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (revealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      let x: number, y: number;
      if ("touches" in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x * 2, y * 2, 40, 0, Math.PI * 2);
      ctx.fill();

      scratchCountRef.current += 1;
      if (scratchCountRef.current > 15) {
        setRevealed(true);
      }
    },
    [revealed]
  );

  const initCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      canvasRef.current = canvas;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;

      // Scratch-off overlay
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "hsl(340, 82%, 65%)");
      gradient.addColorStop(1, "hsl(350, 90%, 72%)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // "Scratch me" text
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = `bold ${canvas.width * 0.07}px Quicksand, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch me! 💅", canvas.width / 2, canvas.height / 2);
    },
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="relative h-40 md:h-48 rounded-2xl overflow-hidden shadow-love bg-card"
    >
      {/* Hidden message underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-card via-secondary to-card">
        <span className="text-3xl mb-2">{emoji}</span>
        <p className="font-display text-foreground text-lg md:text-xl leading-snug">
          {message}
        </p>
      </div>

      {/* Scratch overlay */}
      {!revealed && (
        <canvas
          ref={initCanvas}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          onMouseDown={() => setScratching(true)}
          onMouseUp={() => setScratching(false)}
          onMouseLeave={() => setScratching(false)}
          onMouseMove={(e) => scratching && scratch(e)}
          onTouchStart={() => setScratching(true)}
          onTouchEnd={() => setScratching(false)}
          onTouchMove={(e) => scratch(e)}
        />
      )}

      {revealed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          className="absolute top-2 right-2 text-2xl"
        >
          ✅
        </motion.div>
      )}
    </motion.div>
  );
};

const ScratchOff = () => {
  return (
    <section className="min-h-screen py-20 px-6 flex flex-col items-center justify-center bg-gradient-rose">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-display text-gradient-love text-center mb-6"
      >
        Scratch & Discover
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground font-body mb-16"
      >
        Scratch each card to reveal a secret message 💅✨
      </motion.p>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scratchCards.map((card, i) => (
          <ScratchCard key={i} {...card} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ScratchOff;
