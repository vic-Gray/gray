"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";

/* -----------------------------
   PROJECT DATA (FULL + HUMAN-FRIENDLY)
--------------------------------*/

const projectsList = [
  {
    id: 1,
    name: "🚀 Engagement API – Web3-Ready Content Interaction Platform",
    summary: "Backend system for content engagement tracking, rewarding users, and future Web3 integration.",
    description: `Backend API powering content engagement, tying interactions (likes, comments, views) to potential rewards and future blockchain incentives.

Status: Actively in Development

Overview:
A NestJS-based backend API enabling secure content creation and interaction, designed to scale and integrate Web3 reward mechanisms in the future.

Key Features:
Implemented:
- User registration & secure login (JWT)
- Role-based permissions: Admin, User, Creator, Moderator
- Content creation & media management
- Likes, comments, and engagement tracking
- Cloud media uploads (Cloudinary)
- Email notifications (Nodemailer)

Planned:
- Web3 reward triggers & smart contract integration
- Rate-limiting & spam detection
- Pagination for all content lists
- User profile image upload & updates

Tech Stack:
- Framework: NestJS (TypeScript)
- Database: MongoDB (Mongoose)
- Authentication: JWT + Role-based Access Control
- Media Storage: Cloudinary
- Email Service: Nodemailer
- Web3 Integration: Modular smart contract layer (planned)

GitHub: https://github.com/vic-Gray/engagement-api`
  },
  {
    id: 2,
    name: "📅 Event Management API – Role-Based Booking & Event Platform",
    summary: "Backend API to manage events and bookings with secure role-based access for organizers and participants.",
    description: `A NestJS-based backend API designed to manage events, bookings, and user participation with secure role-based access. Built for scalable, reliable event platforms with future-ready real-time capabilities.

📝 Overview:
This API allows users to create, manage, and participate in events while maintaining secure authentication and role-based permissions. Ideal for community-driven events, online/offline bookings, and platforms needing real-time updates.

💡 Key Features:
Implemented:
✅ User registration & secure login (JWT)
✅ Role-based access: Admin, Organizer, User
✅ Create, update, and manage events
✅ Book events, track attendance, and participation
✅ Transactional emails (booking confirmations, event updates) via Nodemailer
✅ Database-optimized queries for fast retrieval of event and booking data

Planned:
🔜 Real-time updates via WebSockets or Server-Sent Events (live event status, bookings)
🔜 Rate limiting & spam protection
🔜 Pagination for event and booking lists
🔜 User profile management (profile images, preferences)
🔜 Enhanced analytics for events (attendance trends, engagement metrics)

🛠 Tech Stack:
- Framework: NestJS (TypeScript)
- Database: PostgreSQL (with TypeORM ORM)
- Authentication: JWT tokens with access & refresh support
- Email Service: Nodemailer
- Real-time: WebSocket/SSE integration planned
- Role-Based Access Control: Admin, Organizer, User

🔗 GitHub: https://github.com/vic-Gray/event-api`
  },
  {
    id: 3,
    name: "🌐 Next-Gen – Frontend Experience Platform",
    summary: "Frontend web app for personal growth, habits, and productivity tracking with interactive dashboards.",
    description: `A modern, TypeScript-powered front-end web application focused on user experience and personal growth modules. Built with React/Next.js, it delivers an interactive, responsive, and scalable UI for personal improvement tools and dashboards.

📝 Overview:
Interactive front-end interface for tracking personal growth, habits, and productivity. Modular design ensures scalability and future backend integration.

💡 Key Features:
✅ Interactive dashboards
✅ Responsive UI (mobile + desktop)
✅ Component-based architecture
✅ TypeScript type safety
✅ Dynamic routing & page transitions
✅ Theme toggling (light/dark)
✅ Performance optimizations
✅ API integration ready

🛠 Tech Stack:
React / Next.js, TypeScript, CSS/Tailwind, API-ready

🔗 GitHub: https://github.com/vic-Gray/next-Gen
🔗 Live Demo: https://next-gen-ten-gamma.vercel.app`
  }
];

/* -----------------------------
   TERMINAL COMPONENT
--------------------------------*/

type TerminalLine = {
  type: "input" | "output" | "error" | "success";
  content: string;
};

const Terminal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Victory's Interactive Terminal v2.0" },
    { type: "output", content: 'Type "help" to see available commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const [awaitingProject, setAwaitingProject] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  /* -----------------------------
     COMMAND HANDLER
  --------------------------------*/

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setHistory((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (awaitingProject) {
      const choice = parseInt(cmd);
      const project = projectsList.find((p) => p.id === choice);
      if (project) {
        setAwaitingProject(false);
        setHistory((prev) => [
          ...prev,
          { type: "success", content: `${project.name}\nSummary: ${project.summary}\n\n${project.description}` },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { type: "error", content: "Invalid project number. Please try again." },
        ]);
      }
      return;
    }

    switch (trimmed) {
      case "help":
        setHistory((prev) => [
          ...prev,
          {
            type: "success",
            content: `Available commands:
help               - Show commands
projects           - List and view projects
skills             - Show skill modules
contact            - Contact info
whoami             - About me
clear              - Clear terminal
`,
          },
        ]);
        break;

      case "projects":
        let menu = "Select a project by number:\n";
        projectsList.forEach((p) => (menu += `${p.id}) ${p.name}\n`));
        setHistory((prev) => [...prev, { type: "success", content: menu }]);
        setAwaitingProject(true);
        break;

      case "skills":
        setHistory((prev) => [
          ...prev,
          {
            type: "success",
            content: `> Loading skill modules...

████████████████████ TypeScript 95%
███████████████░░░░ Rust 80%
██████████████░░░░░ Move 75%
█████████████████░░ Node.js 90%
████████████████░░░ PostgreSQL 85%
████████████████░░░ Docker 88%`,
          },
        ]);
        break;

      case "contact":
        setHistory((prev) => [
          ...prev,
          {
            type: "success",
            content: `📧 Email: victorygray59@gmail.com
🐙 GitHub: https://github.com/vic-Gray
💼 LinkedIn: https://www.linkedin.com/in/victory-azuonye/
🐦 X/Twitter: @victory_gray`,
          },
        ]);
        break;

      case "whoami":
        setHistory((prev) => [
          ...prev,
          {
            type: "success",
            content: `{
"name": "Victory Ifeanyi Azuonye",
"role": "Backend Engineer & Web3 Explorer",
"location": "Building the decentralized future",
"interests": ["APIs", "Smart Contracts", "System Design"],
"currently": "Open to opportunities"
}`,
          },
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "sudo deploy portfolio":
        setHistory((prev) => [
          ...prev,
          { type: "success", content: `🚀 Initializing deployment...
📦 Building production bundle...
✅ Deployment successful!
🌐 Portfolio is now live at victory.dev` },
        ]);
        break;

      default:
        if (trimmed === "") return;
        setHistory((prev) => [
          ...prev,
          { type: "error", content: `Command not found: ${cmd}. Type "help" for commands.` },
        ]);
        break;
    }
  };

  /* -----------------------------
     INPUT HISTORY NAVIGATION
  --------------------------------*/

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const quickCommands = ["help", "projects", "skills", "contact", "whoami"];

  return (
    <section id="terminal" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">&gt;</span> Interactive Terminal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio through the command line.
          </p>
        </motion.div>

        {/* Quick Commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-4 py-2 bg-secondary hover:bg-primary/20 border border-border hover:border-primary/50 rounded-lg text-sm font-mono transition-all"
            >
              {cmd}
            </button>
          ))}
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="terminal-window glow-border animate-pulse-glow cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-sm text-muted-foreground">victory@portfolio:~</span>
            </div>

            <div
              ref={outputRef}
              className="p-4 h-80 overflow-y-auto font-mono text-sm space-y-1"
            >
              <AnimatePresence>
                {history.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`whitespace-pre-wrap ${
                      line.type === "input"
                        ? "text-primary"
                        : line.type === "error"
                        ? "text-red-400"
                        : line.type === "success"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {line.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Input Line */}
              <div className="flex items-center mt-1">
                <span className="text-primary mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-foreground caret-primary"
                  placeholder="Type a command..."
                  autoFocus
                />
                <span className="w-2 h-5 bg-primary cursor-blink" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
