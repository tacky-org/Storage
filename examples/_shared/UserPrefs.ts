export interface UserPrefs {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
}

export const DEFAULT_USER_PREFS: UserPrefs = {
  theme: "light",
  language: "en",
  notifications: false,
};

export function validateUserPrefs(raw: unknown): UserPrefs {
  const r = raw as UserPrefs;
  if (!["light", "dark"].includes(r?.theme)) throw new Error("Invalid theme");
  if (typeof r?.language !== "string") throw new Error("Invalid language");
  if (typeof r?.notifications !== "boolean") throw new Error("Invalid notifications");
  return r;
}
