// lib/cookies.ts
export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return;

  const value = document.cookie;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
};
