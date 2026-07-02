import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Global application store using Zustand.
 * Manages theme, sidebar, search, and UI state.
 */

interface ThemeState {
  /** 'light' | 'dark' | 'system' */
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

interface SearchState {
  query: string;
  isOpen: boolean;
  setQuery: (query: string) => void;
  open: () => void;
  close: () => void;
}

interface NotificationState {
  count: number;
  increment: () => void;
  reset: () => void;
}

/**
 * useThemeStore — persisted theme preference.
 *
 * Usage:
 *   const { theme, setTheme } = useThemeStore();
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "stelizabeth-theme" },
  ),
);

/**
 * useSidebarStore — sidebar open/close state.
 *
 * Usage:
 *   const { isOpen, toggle } = useSidebarStore();
 */
export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

/**
 * useSearchStore — global search state.
 *
 * Usage:
 *   const { query, setQuery, isOpen, open, close } = useSearchStore();
 */
export const useSearchStore = create<SearchState>()((set) => ({
  query: "",
  isOpen: false,
  setQuery: (query) => set({ query }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, query: "" }),
}));

/**
 * useNotificationStore — notification badge count.
 *
 * Usage:
 *   const { count, increment, reset } = useNotificationStore();
 */
export const useNotificationStore = create<NotificationState>()((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 }),
}));
