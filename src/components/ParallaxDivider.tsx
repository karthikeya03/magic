import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxDividerProps {
  variant?: "hearts" | "stars" | "petals" | "bubbles";
}

const configs = {
  hearts: {
    items: ["💕", "💖", "💗", "❤️", "💓", "💘", "💝", "💞"],
    bg: "from-transparent via-rose-light/30 to-transparent",
  },
  stars: {
    items: ["✨", "⭐", "🌟", "💫", "✨", "⭐", "🌟", "💫"],
    bg: "from-transparent via-gold/10 to-transparent",
  },
  petals: {
    items: ["🌸", "🌺", "🌷", "🌹", "🌻", "💐", "🌸", "🌺"],
    bg: "from-transparent via-primary/5 to-transparent",
  },
  bubbles: {
    items: ["🫧", "💭", "🤍", "🩷", "🫧", "💭", "🤍", "🩷"],
    bg: "from-transparent via-secondary/30 to-transparent",
  },
};

const ParallaxDivider = ({ variant = "hearts" }: ParallaxDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const config = configs[variant];

  return (
    <div
      ref={ref}
      className={`relative h-40 md:h-56 overflow-hidden bg-gradient-to-b ${config.bg}`}
    >
      {config.items.map((item, i) => {
        const speed = 0.3 + (i % 3) * 0.2;
        const direction = i % 2 === 0 ? 1 : -1;
        return (
          <ParallaxItem
            key={i}
            emoji={item}
            scrollYProgress={scrollYProgress}
            speed={speed}
            direction={direction}
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`,
              fontSize: `${20 + (i % 4) * 8}px`,
            }}
          />
        );
      })}

      {/* Rising particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute animate-rise"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-20px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            fontSize: `${10 + Math.random() * 14}px`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        >
          {config.items[i % config.items.length]}
        </div>
      ))}
    </div>
  );
};

const ParallaxItem = ({
  emoji,
  scrollYProgress,
  speed,
  direction,
  style,
}: {
  emoji: string;
  scrollYProgress: any;
  speed: number;
  direction: number;
  style: React.CSSProperties;
}) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -150 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 50 * direction]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed * direction]);

  return (
    <motion.div
      style={{ y, x, rotate, ...style }}
      className="absolute pointer-events-none"
    >
      {emoji}
    </motion.div>
  );
};

export default ParallaxDivider;
