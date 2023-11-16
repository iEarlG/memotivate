"use client"

import { ElementRef, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { useMutation, useQuery } from "convex/react";

import { ChevronLeft, Menu, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";

import { UserItem } from "@/components/main/UserItem";
import { Items } from "@/components/main/Items";
import { toast } from "sonner";

export const Navigation = () => {
    const pathname = usePathname();

    const isResizing = useRef(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const documents = useQuery(api.documents.get);
    const create = useMutation(api.documents.create);

    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
      if (isMobile) {
        collapseSidebar();
      } else {
        resetSidebarWidth();
      }
    }, [isMobile]);

    useEffect(() => {
      if (isMobile) {
        collapseSidebar();
      }
    }, [pathname, isMobile]);
    
    

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizing.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetSidebarWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapseSidebar = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("left", "0");
            navbarRef.current.style.setProperty("width", "100%");

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleCreate = async () => {
        const promise = create({ title: "Untitled" });

        toast.promise(promise, {
            loading: "Creating new note",
            success: "New note created!",
            error: "Failed to create new note."
        })
    };

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
                onClick={collapseSidebar}
                className={cn(`absolute h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 
                dark:hover:bg-neutral-600 top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition`,
                    isMobile && "opacity-100",
            )}
            >
                <ChevronLeft className="h-5 w-5" />
            </div>
            <div>
                <UserItem />
                <Items 
                    label="New Page"
                    icon={PlusCircle}
                    onClick={handleCreate}
                />
            </div>
            <div className="mt-4">
                {documents?.map((document) => (
                    <p key={document._id}
                    >
                        {document.title}
                    </p>
                ))}
            </div>
            <div 
                onMouseDown={handleMouseDown}
                onClick={resetSidebarWidth}
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
                    <Menu 
                        role="button"
                        onClick={resetSidebarWidth}
                        className="h-6 w-6 text-muted-foreground" 
                    />
                )}
            </nav>
        </div>
       </>
    );
}