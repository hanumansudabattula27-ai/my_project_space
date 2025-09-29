// src/components/ui/bento.tsx
"use client";

import { motion } from "framer-motion";
import { Command, Layers, Zap, Shield, Code, Globe } from "lucide-react";

const features = [
  { 
    title: "Command Palette", 
    desc: "Global ⌘K for instant navigation", 
    icon: Command,
    size: "lg"
  },
  { 
    title: "Modular Design", 
    desc: "Feature-first architecture", 
    icon: Layers,
    size: "md"
  },
  { 
    title: "Lightning Fast", 
    desc: "Optimized performance", 
    icon: Zap,
    size: "md"
  },
  { 
    title: "Enterprise Security", 
    desc: "JWT & OAuth integration", 
    icon: Shield,
    size: "lg"
  },
  { 
    title: "Modern Stack", 
    desc: "Next.js 14 & TypeScript", 
    icon: Code,
    size: "md"
  },
  { 
    title: "Global Access", 
    desc: "External tool integration", 
    icon: Globe,
    size: "md"
  },
];

export function Bento() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Built for Scale
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Every component designed with enterprise workflows in mind
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isLarge = feature.size === "lg";
          
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${
                isLarge ? "md:col-span-2" : ""
              }`}
            >
              {/* Subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="relative z-10 mb-4">
                <div className="inline-flex p-3 bg-slate-100 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  <Icon size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-slate-900 group-hover:w-full transition-all duration-300" />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-full text-slate-700">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">System operational</span>
        </div>
      </motion.div>
    </section>
  );
}