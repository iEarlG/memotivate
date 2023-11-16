"use client"

import { LucideIcon } from "lucide-react";

interface ItemsProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
};

export const Items = ({
    label,
    icon: Icon,
    onClick
}: ItemsProps) => {
    return (
        <div 
            role="button" 
            style={{ paddingLeft: "12px" }}
            onClick={onClick}
            className="group w-full min-h-[27px] flex items-center text-sm py-1 pr-3 hover:bg-primary/5 text-muted-foreground font-medium"
        >
            <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            <span className="truncate">
                {label}
            </span>
        </div>
    );
}