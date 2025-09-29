// src/components/ui/command-menu.tsx
"use client";

import * as React from "react";
import Fuse from "fuse.js";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

const items = [
  { type: "nav", name: "Home", href: "/" },
  { type: "nav", name: "JWT Utility", href: "/tools/jwt" },
  { type: "nav", name: "Server Monitor", href: "/tools/servers" },
  { type: "nav", name: "CAART", href: "/tools/caart" },
  { type: "nav", name: "Env Matrix", href: "/tools/env-matrix" },
  { type: "ext", name: "Grafana", href: process.env.NEXT_PUBLIC_GRAFANA_URL ?? "#" },
  { type: "ext", name: "Prometheus", href: process.env.NEXT_PUBLIC_PROMETHEUS_URL ?? "#" },
  { type: "ext", name: "Kibana", href: process.env.NEXT_PUBLIC_KIBANA_URL ?? "#" },
];

const fuse = new Fuse(items, { keys: ["name"], includeScore: true, threshold: 0.35 });

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const results = query ? fuse.search(query).map((r) => r.item) : items;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search tools, pages, actions…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Internal Tools">
          {results.filter(r => r.type === "nav").map((r) => (
            <CommandItem key={r.name} onSelect={() => { setOpen(false); router.push(r.href); }}>
              {r.name}
              <CommandShortcut>↵</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="External Integrations">
          {results.filter(r => r.type === "ext").map((r) => (
            <CommandItem key={r.name} onSelect={() => { 
              setOpen(false); 
              if (r.href !== "#") {
                window.open(r.href, "_blank");
              }
            }}>
              {r.name}
              {r.href === "#" && <CommandShortcut>Not configured</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}