"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "@/stores/session-store";
import { SessionsApi } from "@/lib/api/sessions";
import { getCookie } from "@/lib/cookies";
import { useGameStore } from "@/stores/game-store";

export const useSession = () => {
  const { setSelectedGame } = useGameStore();
  const { sessionId, gameId, setSession, clearSession } = useSessionStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createSession = async (gameId: string) => {
    setIsLoading(true);
    try {
      const session = await SessionsApi.create(gameId);
      setSession({
        sessionId: session.id,
        gameId: session.gameId,
        teams: session.teams || [],
        settings: session.settings || [],
      });
      setError(null);
    } catch (err) {
      setError("Ошибка создания сессии");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      setIsLoading(true);

      try {
        const cookieSessionId = getCookie("sessionId");

        if (cookieSessionId) {
          try {
            const session = await SessionsApi.getById(cookieSessionId);
            setSession({
              sessionId: session.id,
              gameId: session.gameId,
              teams: session.teams || [],
              settings: session.settings || [],
            });
            setSelectedGame(session.gameId);
            return; // Успешно загрузили существующую сессию
          } catch (err) {
            // Сессия из куки невалидна - очищаем
            clearSession();
            document.cookie = "sessionId=; Max-Age=0; path=/";
          }
        }

        // Если дошли сюда, значит нужно создавать новую сессию
        // Но не создаем здесь, ждем вызова createSession из компонента
      } catch (err) {
        setError("Ошибка инициализации сессии");
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  return {
    sessionId,
    gameId,
    isLoading,
    error,
    createSession,
    hasSession: !!sessionId,
  };
};
