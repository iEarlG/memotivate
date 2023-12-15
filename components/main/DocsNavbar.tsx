"use client"

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { Menu } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Banner } from "@/components/Banner";
import { DocsTitle } from "@/components/main/DocsTitle";
import { DocsMenu } from "@/components/main/DocsMenu";
import { Publish } from "@/components/main/Publish";

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
            <nav className="w-full flex items-center justify-between px-3 py-2 bg-background dark:bg-[#0F0F0F]">
                <DocsTitle.Skeleton />
                <div className="flex items-center gap-x-2">
                    <DocsMenu.Skeleton />
                </div>
            </nav>
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
                    <DocsTitle initialData={document} />
                    <div className="flex items-center gap-x-2">
                        <Publish initialData={document} />
                        <DocsMenu documentId={document._id} />
                    </div>
                </div>
            </nav>
            {document.isArchived && (
                <Banner 
                    documentId={document._id}
                    initialData={document}
                />
            )}
        </>
    )
};