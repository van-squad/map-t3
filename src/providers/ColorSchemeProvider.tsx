"use client";
import { ColorSchemeProvider as ColorTheme } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

export interface ColorSchemeProps {
  children: React.ReactNode;
}

type ColorScheme = "light" | "dark";

const ColorSchemeProvider = ({ children }: ColorSchemeProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  // Enale tailwind dark mode
  useEffect(() => {
    const rootRef = document.documentElement;
    colorScheme === "dark"
      ? rootRef.classList.add("dark")
      : rootRef.classList.remove("dark");
  }, [colorScheme]);

  return (
    <ColorTheme colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {children}
    </ColorTheme>
  );
};

export default ColorSchemeProvider;
