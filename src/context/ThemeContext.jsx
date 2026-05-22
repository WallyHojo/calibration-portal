import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContextInstance";
import { THEMES } from "../services/themeConstants";

const STORAGE_KEY  = "calibright_theme";
const DEFAULT_THEME = THEMES.LIGHT;

// ─── Apply theme to <html> element ────────────────────────────────────────────
function applyTheme(mode) {
  const root        = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark      = mode === THEMES.DARK || (mode === THEMES.SYSTEM && prefersDark);

  root.classList.toggle("dark", isDark);
}

// ─── Read stored preference ───────────────────────────────────────────────────
function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme);

  // Apply on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Re-apply if system preference changes while "system" is selected
  useEffect(() => {
    if (theme !== THEMES.SYSTEM) return;

    const mq       = window.matchMedia("(prefers-color-scheme: dark)");
    const handler  = () => applyTheme(THEMES.SYSTEM);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  function setTheme(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch { /* sessionStorage fallback if localStorage unavailable */ }
    setThemeState(mode);
  }

  const value = {
    theme,
    setTheme,
    isLight:  theme === THEMES.LIGHT,
    isDark:   theme === THEMES.DARK,
    isSystem: theme === THEMES.SYSTEM,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}