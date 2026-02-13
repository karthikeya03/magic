import { motion } from "framer-motion";
import { useState } from "react";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpg";
import memory3 from "@/assets/memory3.jpg";

const memories = [
  { img: memory1, caption: "Our love story ✨", subtitle: "Every moment is better with you" },
  { img: memory2, caption: "Just like us 🐱", subtitle: "Cuddling is our superpower" },
  { img: memory3, caption: "For you, always 🌹", subtitle: "A thousand roses aren't enough" },
];

const MemoryGallery = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-rose">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-display text-gradient-love text-center mb-6"
      >
        Our Moments
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground font-body mb-16"
      >
        Hover over each memory 💫
      </motion.p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {memories.map((mem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onHoverStart={() => setActiveIdx(i)}
            onHoverEnd={() => setActiveIdx(null)}
            className="relative rounded-3xl overflow-hidden shadow-love cursor-pointer group"
          >
            <img
              src={mem.img}
              alt={mem.caption}
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6"
              animate={{ y: activeIdx === i ? 0 : 10, opacity: activeIdx === i ? 1 : 0.8 }}
            >
              <h3 className="text-primary-foreground font-display text-2xl">{mem.caption}</h3>
              <p className="text-primary-foreground/70 font-body text-sm mt-1">{mem.subtitle}</p>
            </motion.div>

            {activeIdx === i && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 text-3xl"
              >
                💖
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemoryGallery;
