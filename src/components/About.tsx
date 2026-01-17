import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "TypeScript", level: 95 },
  { name: "Rust", level: 80 },
  { name: "Move", level: 75 },
  { name: "Node.js", level: 90 },
  { name: "PostgreSQL", level: 85 },
  { name: "Docker", level: 88 },
];

const stats = [
  { label: "Backend Systems Deployed", value: "12+" },
  { label: "APIs Built", value: "50+" },
  { label: "Smart Contracts", value: "8" },
  { label: "Uptime", value: "99.99%" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">&gt;</span> About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate backend engineer specializing in building scalable systems and exploring the decentralized future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Profile & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Avatar Placeholder */}
            <div className="relative mb-8 flex justify-center lg:justify-start">
              <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-primary/20 to-secondary border border-border overflow-hidden glow-border">
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 lg:right-auto lg:-bottom-2 lg:-right-2 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-mono">
                status: online
              </div>
            </div>

            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-sm text-muted-foreground">about.json</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-2">
                <div className="code-line">
                  <span className="text-muted-foreground">{"{"}</span>
                </div>
                <div className="code-line pl-4">
                  <span className="text-primary">"name"</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-emerald-400 ml-2">"Victory Ifeanyi Azuonye"</span>
                </div>
                <div className="code-line pl-4">
                  <span className="text-primary">"role"</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-emerald-400 ml-2">"Backend Engineer"</span>
                </div>
                <div className="code-line pl-4">
                  <span className="text-primary">"focus"</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-emerald-400 ml-2">["APIs", "Web3", "DevOps"]</span>
                </div>
                <div className="code-line pl-4">
                  <span className="text-primary">"available"</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-amber-400 ml-2">true</span>
                </div>
                <div className="code-line">
                  <span className="text-muted-foreground">{"}"}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Skills & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-4 text-sm text-muted-foreground">skills.log</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="text-primary">$</span> loading skills...
                </div>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, width: 0 }}
                    animate={isInView ? { opacity: 1, width: "100%" } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-mono">{skill.name}</span>
                      <span className="text-sm text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
