"use client"

import { ElementRef, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import { ChevronLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
    const pathname = usePathname();

    const isResizing = useRef(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    return (
       <>
        <aside
            ref={sidebarRef}
            className={cn("group/sidebar h-full relative flex w-60 flex-col bg-secondary overflow-y-auto z-[99999]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "w-0"
            )}
        >
            <div 
                role="button" 
                className={cn(`absolute h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 
                dark:hover:bg-neutral-600 top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition`,
                    isMobile && "opacity-100",
            )}
            >
                <ChevronLeft className="h-6 w-6" />
            </div>
            <div>
                <p>Actions</p>
            </div>
            <div className="mt-4">
                <p>Documents</p>
            </div>
            <div 
                onMouseDown={() => {}}
                onClick={() => {}}
                className="opacity-0 group-hover/sidebar:opacity-100 absolute h-full w-1 bg-primary/10 right-0 top-0 cursor-ew-resize transition" 
            />
        </aside>
        <div
            ref={navbarRef}
            className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "left-0 w-full"
            )}
        >
            <nav className=" w-full bg-transparent px-3 py-2">
                {isCollapsed && (
                    <Menu role="button" className="h-6 w-6 text-muted-foreground" />
                )}
            </nav>
        </div>
       </>
    );
}