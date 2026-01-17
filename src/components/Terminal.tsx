import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

type TerminalLine = {
  type: "input" | "output" | "error" | "success";
  content: string;
};

const commands: Record<string, string | (() => string)> = {
  help: `Available commands:
  projects  - List all projects
  skills    - Show technical skills
  contact   - Get contact information
  whoami    - Learn about me
  clear     - Clear terminal
  sudo deploy portfolio - 🚀`,
  
  projects: `┌─────────────────────────────────────┐
│ PROJECT         │ STATUS   │ TECH   │
├─────────────────────────────────────┤
│ Engagement API  │ Active   │ TS     │
│ DeFi Protocol   │ Active   │ Rust   │
│ Data Pipeline   │ Active   │ Kafka  │
│ Auth Service    │ Active   │ Go     │
└─────────────────────────────────────┘`,
  
  skills: `> Loading skill modules...

  ████████████████████ TypeScript 95%
  ████████████████░░░░ Rust       80%
  ███████████████░░░░░ Move       75%
  ██████████████████░░ Node.js    90%
  █████████████████░░░ PostgreSQL 85%
  █████████████████░░░ Docker     88%`,
  
  contact: `📧 Email: victory@example.com
🐙 GitHub: github.com/victory
💼 LinkedIn: linkedin.com/in/victory
🐦 X/Twitter: @victory_dev`,
  
  whoami: `{
  "name": "Victory Ifeanyi Azuonye",
  "role": "Backend Engineer & Web3 Explorer",
  "location": "Building the decentralized future",
  "interests": ["APIs", "Smart Contracts", "System Design"],
  "currently": "Open to opportunities"
}`,
  
  clear: "__CLEAR__",
  
  "sudo deploy portfolio": () => {
    const messages = [
      "🚀 Initializing deployment...",
      "📦 Building production bundle...",
      "✅ Deployment successful!",
      "🌐 Portfolio is now live at victory.dev",
    ];
    return messages.join("\n");
  },
};

const Terminal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Victory's Terminal v1.0.0" },
    { type: "output", content: 'Type "help" to see available commands.' },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const response = commands[trimmedCmd];
    
    if (response) {
      const output = typeof response === "function" ? response() : response;
      setHistory((prev) => [...prev, { type: "success", content: output }]);
    } else if (trimmedCmd === "") {
      // Do nothing for empty commands
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${cmd}. Type "help" for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

            {/* Terminal Output */}
            <div
              ref={outputRef}
              className="p-4 h-80 overflow-y-auto font-mono text-sm space-y-1"
            >
              {history.map((line, index) => (
                <div
                  key={index}
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
                </div>
              ))}
              
              {/* Input Line */}
              <div className="flex items-center">
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
