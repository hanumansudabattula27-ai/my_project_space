// src/components/ui/utilities-grid.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Server, ArrowRight, Clock, Users } from "lucide-react";

const utilities = [
  { 
    name: "JWT Utility", 
    desc: "Secure token encoding and decoding with signature verification", 
    href: "/tools/jwt",
    icon: Shield,
    features: ["HMAC-SHA256", "Token Validation", "Export Support"],
    status: "Active"
  },
  { 
    name: "Server Monitor", 
    desc: "Real-time server metrics and health monitoring dashboard", 
    href: "/tools/servers",
    icon: Server,
    features: ["Live Metrics", "CPU & Memory", "Status Tracking"],
    status: "Active"
  },
];

export function UtilitiesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Utilities</h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Professional-grade tools built for security, monitoring, and operational excellence
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {utilities.map((utility, index) => {
          const Icon = utility.icon;
          
          return (
            <motion.div
              key={utility.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full bg-white border-2 border-slate-200 hover:border-slate-400 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                      <Icon size={28} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-slate-600">{utility.status}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl text-slate-900 mb-2">
                    {utility.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    {utility.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {utility.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a 
                    href={utility.href}
                    className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 group/btn"
                  >
                    Launch Tool
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </CardContent>

                {/* Hover effect indicator */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-slate-900 group-hover:w-full transition-all duration-300"></div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        {[
          { icon: Clock, label: "Response Time", value: "< 50ms", desc: "Average tool load time" },
          { icon: Users, label: "Daily Users", value: "1.2k+", desc: "Active professional users" },
          { icon: Shield, label: "Security Score", value: "A+", desc: "Industry-grade protection" }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl border border-slate-200"
            >
              <div className="inline-flex p-3 bg-slate-100 rounded-xl mb-4">
                <Icon size={24} className="text-slate-700" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="font-medium text-slate-700 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.desc}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}