import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("success");
    
    setTimeout(() => {
      setStatus("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">&gt;</span> Contact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's build something amazing together. Send me a message!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="terminal-window glow-border">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-sm text-muted-foreground">contact-api.request</span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Request Preview */}
              <div className="bg-secondary/30 rounded-lg p-4 font-mono text-sm border border-border">
                <div className="text-muted-foreground mb-2">
                  <span className="text-emerald-400">POST</span> /api/contact
                </div>
                <div className="text-xs text-muted-foreground">Content-Type: application/json</div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">"name"</span>:
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full bg-secondary border ${
                      focusedField === "name" ? "border-primary glow-border" : "border-border"
                    } rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground/50 outline-none transition-all`}
                    placeholder="Your name"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">"email"</span>:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full bg-secondary border ${
                      focusedField === "email" ? "border-primary glow-border" : "border-border"
                    } rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground/50 outline-none transition-all`}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">"message"</span>:
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className={`w-full bg-secondary border ${
                      focusedField === "message" ? "border-primary glow-border" : "border-border"
                    } rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground/50 outline-none transition-all resize-none`}
                    placeholder="Your message..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "success"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  status === "success"
                    ? "bg-emerald-500 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {status === "idle" && (
                  <>
                    <Send size={18} />
                    Send Request
                  </>
                )}
                {status === "sending" && (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle size={18} />
                    Request Successful - 200 OK
                  </>
                )}
              </motion.button>

              {/* Response Preview */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 font-mono text-sm"
                >
                  <div className="text-emerald-400 mb-2">Response: 200 OK</div>
                  <pre className="text-xs text-muted-foreground">
{`{
  "status": "success",
  "message": "Thanks! I'll get back to you soon."
}`}
                  </pre>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
