import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Server, Code, Database, Shield } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Engagement API",
    description: "High-performance REST API handling millions of requests for social engagement metrics.",
    status: "Active",
    requestsHandled: "1,243,982",
    tech: ["TypeScript", "Node.js", "Redis"],
    icon: Server,
    github: "#",
    live: "#",
  },
  {
    id: 2,
    name: "DeFi Protocol",
    description: "Decentralized finance smart contracts enabling trustless token swaps on Ethereum.",
    status: "Active",
    tvl: "$2.4M",
    tech: ["Solidity", "Rust", "Web3.js"],
    icon: Shield,
    github: "#",
    live: "#",
  },
  {
    id: 3,
    name: "Data Pipeline",
    description: "Real-time data processing pipeline for analytics with 99.99% uptime.",
    status: "Active",
    eventsProcessed: "50M/day",
    tech: ["Rust", "Kafka", "PostgreSQL"],
    icon: Database,
    github: "#",
    live: "#",
  },
  {
    id: 4,
    name: "Auth Service",
    description: "Microservice handling authentication and authorization for distributed systems.",
    status: "Active",
    users: "100K+",
    tech: ["Go", "JWT", "OAuth2"],
    icon: Code,
    github: "#",
    live: "#",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">&gt;</span> Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of backend systems and Web3 projects I've built.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className="terminal-window h-full hover:glow-border transition-all duration-300">
                <div className="terminal-header">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span className="ml-4 text-sm text-muted-foreground">
                    {project.name.toLowerCase().replace(/\s/g, "-")}.api
                  </span>
                </div>

                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <project.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <span className="text-xs text-primary flex items-center gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        aria-label="View source"
                      >
                        <Github size={18} className="text-muted-foreground hover:text-primary" />
                      </a>
                      <a
                        href={project.live}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        aria-label="View live"
                      >
                        <ExternalLink size={18} className="text-muted-foreground hover:text-primary" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* JSON Preview on Hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      height: hoveredProject === project.id ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-secondary/50 rounded-lg p-3 font-mono text-xs mt-4 border border-border">
                      <div className="text-muted-foreground">{"{"}</div>
                      <div className="pl-4">
                        <span className="text-primary">"name"</span>
                        <span className="text-muted-foreground">: </span>
                        <span className="text-gray-300">"{project.name}"</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary">"status"</span>
                        <span className="text-muted-foreground">: </span>
                        <span className="text-gray-300">"{project.status}"</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary">"metrics"</span>
                        <span className="text-muted-foreground">: </span>
                        <span className="text-gray-400">
                          "{project.requestsHandled || project.tvl || project.eventsProcessed || project.users}"
                        </span>
                      </div>
                      <div className="text-muted-foreground">{"}"}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
