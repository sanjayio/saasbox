"use client";

import { authClient } from "@/lib/auth/auth-client";

export default function DashboardContent() {
  const { data: session } = authClient.useSession();

  return (
    <div className="max-w-2xl mb-4 p-2 flex flex-col space-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Coming Soon</h1>
        <p className="text-muted-foreground mt-2">
          The dashboard experience is on its way.
        </p>
      </div>
    </div>
  );
}
