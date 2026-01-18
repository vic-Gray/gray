import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";


const typingTexts = [
  "Building REST APIs...",
  "Deploying Smart Contracts...",
  "Scaling Backend Systems...",
  "Writing Clean Code...",
  "Exploring Web3...",
];

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
     
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Terminal-style greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="terminal-window glow-border">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-sm text-muted-foreground">welcome.sh</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <span className="text-primary">$</span>
                <span className="text-muted-foreground ml-2">echo</span>
                <span className="text-foreground ml-2">"Hello, World!"</span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Hi, I'm{" "}
            <span className="text-gradient glow-text">Victory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Backend Engineer & Web3 Explorer
          </motion.p>

          {/* Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="h-12 flex items-center justify-center mb-12"
          >
            <span className="text-lg md:text-xl font-mono">
              <span className="text-primary">&gt;</span>
              <span className="text-foreground ml-2">{displayText}</span>
              <span className="inline-block w-3 h-6 bg-primary ml-1 cursor-blink" />
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href="#terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg glow-box hover:bg-primary/90 transition-all"
          >
            Explore My Terminal
            <ChevronDown className="animate-bounce" size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
