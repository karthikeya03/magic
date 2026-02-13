import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ValentineQuestion = () => {
  const [answered, setAnswered] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const noMessages = [
    "No 😢",
    "Are you sure? 🥺",
    "Really sure? 😭",
    "Pretty please? 🙏",
    "Think again! 💔",
    "Last chance! 😿",
    "I won't give up! 💪",
    "Don't do this! 😩",
  ];

  const yesScale = 1 + noCount * 0.2;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-8"
            >
              🥺
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display text-gradient-love mb-12">
              Will you be my Valentine?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: yesScale }}
                onClick={() => setAnswered(true)}
                className="bg-gradient-love text-primary-foreground font-body font-bold px-10 py-4 rounded-full shadow-love text-xl"
              >
                Yes! 💕
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNoCount((c) => c + 1)}
                className="bg-secondary text-secondary-foreground font-body px-8 py-4 rounded-full text-lg"
                style={{ fontSize: `${Math.max(16 - noCount * 2, 8)}px` }}
              >
                {noMessages[Math.min(noCount, noMessages.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-9xl mb-8"
            >
              🎉
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-display text-gradient-love mb-6">
              Yay!!!
            </h2>
            <p className="text-2xl font-body text-muted-foreground mb-4">
              I knew you'd say yes, Kitty! 💕
            </p>
            <p className="text-lg font-body text-muted-foreground">
              I love you to the moon and back! 🌙
            </p>

            {/* Celebration hearts */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                style={{ left: "50%", top: "50%" }}
              >
                {["💕", "💖", "💗", "❤️", "🌹", "✨"][i % 6]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ValentineQuestion;
