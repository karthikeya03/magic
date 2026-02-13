import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-blush opacity-70" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="text-8xl md:text-9xl mb-6"
        >
          💕
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display text-gradient-love mb-4"
        >
          For My Kitty
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground font-body font-light tracking-wide"
        >
          A little corner of the internet, just for you
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary text-3xl"
          >
            ↓
          </motion.div>
          <p className="text-sm text-muted-foreground mt-2 font-body">Scroll down, my love</p>
        </motion.div>
      </div>

      {/* Decorative floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary opacity-20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            fontSize: `${20 + i * 8}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          ♥
        </motion.div>
      ))}
    </section>
  );
};

export default HeroSection;
