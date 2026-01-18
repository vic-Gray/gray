"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Server, Code, Database, Shield } from "lucide-react";

type Project = {
  id: number;
  name: string;
  summary: string;
  description: string;
  status: string;
  metrics?: string;
  tech: string[];
  icon: any;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "🚀 Engagement API – Web3-Ready Content Interaction Platform",
    summary: "Backend system to track social engagement and future Web3 rewards, easy for users and creators.",
    description: `💡 Key Features:
- Secure user registration & JWT login
- Role-based permissions: Admin, User, Creator, Moderator
- Content creation & media management
- Likes, comments, engagement tracking
- Cloud media uploads (Cloudinary)
- Email notifications (Nodemailer)

🔜 Planned:
- Web3 reward triggers & smart contract integration
- Rate limiting & spam detection
- Pagination & user profile updates

🛠 Tech Stack: NestJS, MongoDB, JWT, Cloudinary, Nodemailer`,
    status: "Active",
    metrics: "1,243,982 requests handled",
    tech: ["NestJS", "MongoDB", "JWT", "Cloudinary", "Nodemailer"],
    icon: Server,
    github: "https://github.com/vic-Gray/engagement-api",
    live: "#",
  },
  {
    id: 2,
    name: "📅 Event Management API – Role-Based Booking & Event Platform",
    summary: "Backend API for managing events, bookings, and secure role-based access for organizers and users.",
    description: `💡 Key Features:
- Secure login & role-based access (Admin, Organizer, User)
- Create, update, manage events
- Book events & track participation
- Transactional emails via Nodemailer

🔜 Planned:
- Real-time updates (WebSocket/SSE)
- Rate limiting & spam protection
- Analytics & user profiles

🛠 Tech Stack: NestJS, PostgreSQL, TypeORM, JWT, Nodemailer`,
    status: "Active",
    metrics: "$2.4M TVL",
    tech: ["NestJS", "PostgreSQL", "TypeORM", "JWT", "Nodemailer"],
    icon: Shield,
    github: "https://github.com/vic-Gray/event-api",
    live: "#",
  },
  {
    id: 3,
    name: "🌐 Next-Gen – Frontend Experience Platform",
    summary: "Interactive front-end app to track personal growth, habits, and productivity with responsive UI.",
    description: `💡 Key Features:
- Interactive dashboards with personalized modules
- Responsive UI (mobile & desktop)
- Theme toggling (light/dark)
- Optimized performance & lazy loading
- API integration ready

🔜 Planned:
- Real-time notifications
- Analytics dashboards
- AI-powered suggestions
- PWA offline support

🛠 Tech Stack: React, Next.js, TypeScript, CSS/Tailwind`,
    status: "Active",
    metrics: "User growth tracking ongoing",
    tech: ["React", "Next.js", "TypeScript", "Tailwind", "CSS"],
    icon: Code,
    github: "https://github.com/vic-Gray/next-Gen",
    live: "https://next-gen-ten-gamma.vercel.app",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
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
            A curated collection of projects demonstrating backend systems, frontend experiences, and Web3 readiness.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="terminal-window h-full hover:glow-border transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setExpandedProject(expandedProject === project.id ? null : project.id)
                }
              >
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
                      {project.github && (
                        <a
                          href={project.github}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={18} className="text-muted-foreground hover:text-primary" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={18} className="text-muted-foreground hover:text-primary" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-muted-foreground text-sm mb-4">{project.summary}</p>

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

                  {/* Full Details */}
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden bg-secondary/50 rounded-lg p-3 font-mono text-xs mt-4 border border-border"
                    >
                      <pre className="whitespace-pre-wrap text-muted-foreground">
                        {project.description}
                      </pre>
                      {project.metrics && (
                        <div className="mt-2">
                          <span className="text-primary">Metrics: </span>
                          <span>{project.metrics}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
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
