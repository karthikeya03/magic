import { motion } from "framer-motion";
import { useState } from "react";

const notes = [
  { text: "You are my sunshine ☀️", color: "from-primary to-accent", rotation: -3 },
  { text: "I love your laugh 😂", color: "from-accent to-rose", rotation: 2 },
  { text: "You're purr-fect 😻", color: "from-rose to-primary", rotation: -1 },
  { text: "My heart is yours 💖", color: "from-primary to-love", rotation: 3 },
  { text: "Forever & always 💕", color: "from-love to-accent", rotation: -2 },
  { text: "Dream girl ✨", color: "from-accent to-primary", rotation: 1 },
  { text: "Best cuddles ever 🤗", color: "from-primary to-rose", rotation: -4 },
  { text: "My favorite person 🌸", color: "from-rose to-accent", rotation: 2 },
  { text: "I choose you 💗", color: "from-love to-primary", rotation: -1 },
  { text: "You make me better 🌟", color: "from-accent to-love", rotation: 3 },
  { text: "Kitty, you're magic 🐱", color: "from-primary to-accent", rotation: -2 },
  { text: "My happy place 🏠", color: "from-rose to-primary", rotation: 1 },
];

const LoveNotesWall = () => {
  const [popped, setPopped] = useState<Set<number>>(new Set());

  const pop = (idx: number) => {
    setPopped((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  return (
    <section className="min-h-screen py-20 px-6 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-display text-gradient-love text-center mb-6"
      >
        Love Notes Wall
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground font-body mb-16"
      >
        Click each sticky note to pop it open 💌
      </motion.p>

      <div className="max-w-5xl w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {notes.map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, rotate: note.rotation * 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: note.rotation }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => pop(i)}
            className="cursor-pointer"
          >
            <div
              className={`relative h-36 md:h-44 rounded-xl shadow-love flex items-center justify-center p-4 text-center transition-all duration-500 ${
                popped.has(i)
                  ? "bg-gradient-to-br " + note.color
                  : "bg-card"
              }`}
            >
              {/* Tape effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-gold/30 rounded-sm" />

              {popped.has(i) ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-display text-primary-foreground text-lg md:text-xl leading-snug"
                >
                  {note.text}
                </motion.p>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">💌</span>
                  <span className="text-xs text-muted-foreground font-body">tap to open</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LoveNotesWall;
