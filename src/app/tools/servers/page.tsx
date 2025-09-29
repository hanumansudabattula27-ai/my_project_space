// app/(tools)/servers/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

async function getServers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/backend/api/servers`, { cache: "no-store" });
  return res.json();
}

export default async function ServersPage() {
  const servers = await getServers();
  return (
    <main className="px-6 py-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {servers.map((s: any) => (
          <Card key={s.id}>
            <CardHeader><CardTitle>{s.name}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>Status: {s.status}</div>
              <div>CPU: {s.cpu}% · MEM: {s.mem}%</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
