import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoveCounter = () => {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [clicks, setClicks] = useState(0);

  // Set your start date here!
  const startDate = new Date("2023-01-12T00:00:00");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setElapsed({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const heartMessages = [
    "I love you! 💕",
    "You're my everything! 🌹",
    "Forever yours! 💖",
    "My heart is yours! 💗",
    "You make me so happy! ✨",
    "Kitty is the best! 🐱",
    "I'm so lucky! 🍀",
    "You're purr-fect! 😻",
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 bg-gradient-rose">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-display text-gradient-love mb-12"
      >
        Time Loving You
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16">
        {[
          { value: elapsed.days, label: "Days" },
          { value: elapsed.hours, label: "Hours" },
          { value: elapsed.minutes, label: "Minutes" },
          { value: elapsed.seconds, label: "Seconds" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-love text-center"
          >
            <motion.span
              key={item.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl font-bold text-gradient-love font-body block"
            >
              {item.value}
            </motion.span>
            <span className="text-muted-foreground text-sm md:text-base font-body mt-2 block">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Interactive heart button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setClicks((c) => c + 1)}
        className="relative text-6xl cursor-pointer animate-heartbeat focus:outline-none"
      >
        ❤️
      </motion.button>
      <p className="text-muted-foreground font-body mt-4 text-sm">Tap the heart!</p>

      {clicks > 0 && (
        <motion.p
          key={clicks}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mt-4 text-xl font-display text-primary"
        >
          {heartMessages[clicks % heartMessages.length]}
        </motion.p>
      )}

      {clicks > 0 && (
        <p className="text-muted-foreground font-body text-xs mt-2">
          You've sent {clicks} love tap{clicks > 1 ? "s" : ""}! 💕
        </p>
      )}
    </section>
  );
};

export default LoveCounter;