import { createContext, useState, type PropsWithChildren } from 'react';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const ThemeContext = createContext({});

export default function ThemeContextProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState(Theme.LIGHT);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
