"use client";

import { getCookie } from "@/lib/cookies";
import { useGameStore } from "@/stores/game-store";
import { useSessionStore } from "@/stores/session-store";
import type { ReactNode } from "react";
import React from "react";

export default function AliasLayout({ children }: { children: ReactNode }) {
  const { loadSession, createSession } = useSessionStore();
  const { selectedGameId } = useGameStore();

  React.useEffect(() => {
    const session = getCookie("sessionId");

    if (!session && selectedGameId) {
      createSession(selectedGameId);
    }

    if (session) {
      loadSession(session);
    }
  }, [selectedGameId]);
  return <main>{children}</main>;
}
