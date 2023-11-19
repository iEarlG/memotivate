"use client"

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

interface ItemsProps {
    id?: Id<"documents">;
    documentsIcon?: string;
    active?: boolean;
    isSearch?: boolean;
    expanded?: boolean;
    onExpand?: () => void;
    level?: number;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
};

export const Items = ({
    id,
    documentsIcon,
    active,
    isSearch,
    expanded,
    onExpand,
    level = 0,
    label,
    icon: Icon,
    onClick
}: ItemsProps) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div 
            role="button" 
            style={{ 
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            onClick={onClick}
            className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary",
            )}
        >
            {!!id && (
                <div 
                    role="button" 
                    className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                    onClick={() => {}}
                >
                    <ChevronIcon
                        className="h-4 w-4 shrink-0 text-muted-foreground/50"
                    />
                </div>
            )}
            {documentsIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentsIcon}
                </div>
            ): (
                <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            )}
            <span className="truncate">{label}</span>
            {isSearch && (
                <kbd className="inline-flex items-center h-5 ml-auto pointer-events-none select-none gap-1 rounded border bg-muted px-1.5 font-mono 
                text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-sm">Ctrl</span>K
                </kbd>
            )}
        </div>
    );
}

Items.Skeleton = function ItemSkeleton({ level }: {level?: number}) {
    return (
        <div
            style={{ paddingLeft: level ? `${(level * 12) + 25}px` : "12px" }}
            className="flex gap-x-2 py-3"
        >
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-4 h-[30%]" />
        </div>
    )
}