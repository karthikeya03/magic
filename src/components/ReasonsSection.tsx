import { motion } from "framer-motion";
import { useState } from "react";

const reasons = [
  { emoji: "😊", title: "Your Smile", text: "It lights up my entire world every single day" },
  { emoji: "🐱", title: "Your Purr-sonality", text: "So unique, so cute, so wonderfully you" },
  { emoji: "💪", title: "Your Strength", text: "You inspire me to be a better person always" },
  { emoji: "😂", title: "Your Laugh", text: "The most beautiful sound I've ever heard" },
  { emoji: "🤗", title: "Your Hugs", text: "They feel like home no matter where we are" },
  { emoji: "✨", title: "Your Kindness", text: "The way you care about everyone around you" },
  { emoji: "🌙", title: "Late Night Talks", text: "Our conversations that go on until sunrise" },
  { emoji: "🎵", title: "How You Sing", text: "Even when you think nobody's listening" },
  { emoji: "👀", title: "Your Eyes", text: "I get lost in them every single time" },
  { emoji: "💖", title: "Everything", text: "I love everything about you, Kitty" },
];

const ReasonsSection = () => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (idx: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-blush">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-display text-gradient-love text-center mb-6"
      >
        10 Reasons I Love You
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground font-body mb-16"
      >
        Click each card to reveal 💕
      </motion.p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFlip(i)}
            className="cursor-pointer perspective-1000"
          >
            <motion.div
              animate={{ rotateY: flipped.has(i) ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative h-48 md:h-56"
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-card rounded-2xl shadow-love flex flex-col items-center justify-center backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-4xl mb-2">{reason.emoji}</span>
                <span className="text-xs text-muted-foreground font-body">tap me</span>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 bg-gradient-love rounded-2xl shadow-love flex flex-col items-center justify-center p-4 text-center backface-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <h3 className="text-primary-foreground font-display text-xl mb-2">{reason.title}</h3>
                <p className="text-primary-foreground/80 font-body text-xs leading-relaxed">{reason.text}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReasonsSection;
