"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ToggleThemeButton() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            variant="ghost"
            size="sm"
            className="focus:bg-transparent hover:bg-transparent px-1"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? <Sun className="h-5 w-5 text-white"/> : <Moon className="h-5 w-5 text-white"/>}
        </Button>
    );
}
