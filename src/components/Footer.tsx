import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Youtube, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/vic-Gray", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/victory-gray-b479a6351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/victory_gr95109", label: "X" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-muted-foreground"
          >
            <span className="text-primary">&gt;</span> victory.dev
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            © {currentYear} 
          </motion.div>
        </div>

        {/* Terminal-style status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="inline-block bg-secondary/50 px-4 py-2 rounded-full font-mono text-xs text-muted-foreground">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            System Status: All services operational
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
