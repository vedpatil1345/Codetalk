import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 bg-transparent rounded-full border-none hover:bg-transparent focus:outline-none text-black"
    >
      <Sun 
        className="absolute min-h-[1.5rem] min-w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
        color="red" 
        absoluteStrokeWidth 
        strokeWidth={2} 
      />
      <Moon 
        className="absolute min-h-[1.5rem] min-w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
        strokeWidth={2} 
        color="skyblue" 
        absoluteStrokeWidth 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}