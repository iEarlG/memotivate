"use client"

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { LoadingSpinner } from "../LoadingSpinner";
import { Menu } from "lucide-react";

interface DocsNavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
};

export const DocsNavbar = ({
    isCollapsed,
    onResetWidth
}: DocsNavbarProps) => {
    const params = useParams();

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    });

    if (document === undefined) {
        return (
            <div>
                <LoadingSpinner />
            </div> 
        )
    };

    if (document === null) {
        return null;
    }

    return (
        <>
            <nav className="w-full flex items-center gap-x-4 px-3 py-2 bg-background dark:bg-[#0F0F0F]">
                {isCollapsed && (
                    <Menu 
                        role="button"
                        className="h-5 w-5 text-muted-foreground"
                        onClick={onResetWidth}
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    Navbar
                </div>
            </nav>
        </>
    )
};