"use client"

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";

import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

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
    onClick?: () => void;
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
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        onExpand?.();
    };

    const onCreateDocumentChild = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = create({ title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                //router.push(`/documents/${documentId}`)
            });

        toast.promise(promise, {
            loading: "Creating document",
            success: "Document created!",
            error: "Failed to create document!"
        });
    };

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (!id) return;

        const promise = archive({id});

        toast.promise(promise, {
            loading: "Archiving document",
            success: "Document archived!",
            error: "Failed to archive document!"
        });
    };

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
                    onClick={handleExpand}
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
            {!!id && (
                <div className="flex items-center gap-x-2 ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                            className="w-60" 
                            align="start" 
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by: {user?.lastName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div 
                        role="button"
                        className="h-full group opacity-0 group-hover:opacity-100 ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" 
                        onClick={onCreateDocumentChild}
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
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