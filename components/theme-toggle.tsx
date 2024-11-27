"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-full justify-start"
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4 mr-2" />
      ) : (
        <Moon className="h-4 w-4 mr-2" />
      )}
      {theme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
}