"use client"

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";

import { Logo } from "@/components/landingpage/Logo";
import { ModeToggle } from "@/components/ToggleMode";

export const Navbar = () => {
    const scrolled = useScroll();


    return (
        <div className={cn("fixed flex items-center w-full z-50 bg-background top-0 p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="flex items-center w-full md:ml-auto md:justify-end justify-between gap-x-2">
                <ModeToggle />
            </div>
        </div>
    );
}