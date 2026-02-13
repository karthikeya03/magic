import { motion } from "framer-motion";

const promises = [
  { icon: "🌅", text: "I promise to love you every morning" },
  { icon: "🤝", text: "I promise to hold your hand through anything" },
  { icon: "😋", text: "I promise to cook for you" },
  { icon: "🎬", text: "I promise endless movie nights together and carry you to bed after you fall asleep in the middle" },
  { icon: "🌍", text: "I promise to travel the world with you" },
  { icon: "🏠", text: "I promise to build a home full of love" },
  { icon: "💐", text: "I promise to surprise you with flowers" },
  { icon: "👴", text: "I promise to grow old with you, still in love" },
];

const PromisesSection = () => {
  return (
    <section className="min-h-screen py-20 px-6 flex flex-col items-center justify-center bg-gradient-blush">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-display text-gradient-love text-center mb-16"
      >
        My Promises to You
      </motion.h2>

      <div className="max-w-2xl w-full relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-0.5" />

        {promises.map((promise, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex items-center mb-8 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <motion.div
              whileInView={{ scale: [0, 1.3, 1] }}
              viewport={{ once: true }}
              className="absolute left-6 md:left-1/2 w-5 h-5 bg-gradient-love rounded-full shadow-love transform -translate-x-1/2 z-10"
            />

            <div
              className={`ml-16 md:ml-0 ${
                i % 2 === 0 ? "md:mr-auto md:pr-12 md:w-1/2 md:text-right" : "md:ml-auto md:pl-12 md:w-1/2"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-card rounded-2xl p-5 shadow-love inline-block"
              >
                <span className="text-2xl mr-2">{promise.icon}</span>
                <span className="font-body text-foreground">{promise.text}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PromisesSection;
