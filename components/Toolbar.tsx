"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
};

export const Toolbar = ({
    initialData,
    preview
}: ToolbarProps) => {
    return (
        <div className="group relative pl-[54px]">
            {!!initialData.icon && !preview && (
                <div>
                    
                </div>
            )}
        </div>
    )
};