import { createContext, useEffect, useState, type ReactNode } from 'react';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.LIGHT,
  toggleTheme: () => {},
});

type ThemeContextProviderProps = {
  children: ReactNode;
};

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const THEME_KEY = 'theme';
  const htmlElement = document.body.parentElement;
  const [theme, setTheme] = useState(Theme.LIGHT);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === Theme.LIGHT || storedTheme === Theme.DARK) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    htmlElement?.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => {
      if (prevTheme === Theme.LIGHT) {
        storeTheme(Theme.DARK);
        return Theme.DARK;
      } else {
        storeTheme(Theme.LIGHT);
        return Theme.LIGHT;
      }
    });

    function storeTheme(value: string) {
      localStorage.setItem(THEME_KEY, value);
    }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
