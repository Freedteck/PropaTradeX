import { createContext } from "react";

// Create a context to manage the theme
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});
