import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const lines = [
  "In a world of billions,",
  "I found the one soul",
  "that makes my heart",
  "skip, dance, and sing.",
  "",
  "Your eyes hold galaxies,",
  "your touch, warm sunlight,",
  "your voice, a melody",
  "I never want to end.",
  "",
  "With every breath I take,",
  "I fall a little deeper —",
  "not because I have to,",
  "but because loving you",
  "is the most beautiful thing",
  "I've ever done. 💕",
];

const InteractivePoem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="min-h-[120vh] py-32 px-6 flex flex-col items-center justify-center bg-gradient-blush relative overflow-hidden"
    >
      {/* Parallax background decorations */}
      <ParallaxLayer scrollYProgress={scrollYProgress} speed={0.3}>
        <div className="absolute top-20 left-10 text-6xl opacity-10">🌸</div>
        <div className="absolute bottom-40 right-16 text-8xl opacity-10">💕</div>
      </ParallaxLayer>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-display text-gradient-love text-center mb-16"
      >
        A Poem for Kitty
      </motion.h2>

      <div className="max-w-xl w-full space-y-1">
        {lines.map((line, i) => {
          if (line === "") {
            return <div key={i} className="h-6" />;
          }
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              onHoverStart={() => setHoveredLine(i)}
              onHoverEnd={() => setHoveredLine(null)}
              className={`font-display text-2xl md:text-4xl text-center leading-relaxed cursor-default transition-all duration-300 ${
                hoveredLine === i
                  ? "text-gradient-love scale-105"
                  : "text-foreground/70"
              }`}
              style={{
                transform: hoveredLine === i ? "scale(1.05)" : "scale(1)",
              }}
            >
              {line}
            </motion.p>
          );
        })}
      </div>

      {/* Sparkle decorations on hover */}
      {hoveredLine !== null && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`sparkle-${hoveredLine}-${i}`}
              className="absolute text-xl pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 100,
              }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{
                left: "50%",
                top: `${30 + (hoveredLine / lines.length) * 50}%`,
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
    </section>
  );
};

const ParallaxLayer = ({
  children,
  scrollYProgress,
  speed,
}: {
  children: React.ReactNode;
  scrollYProgress: any;
  speed: number;
}) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);
  return (
    <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
      {children}
    </motion.div>
  );
};

export default InteractivePoem;
