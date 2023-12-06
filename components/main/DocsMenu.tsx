"use client"

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Archive, MoreHorizontal } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";

interface DocsMenuProps {
    documentId: Id<"documents">;
};

export const DocsMenu = ({
    documentId,
}: DocsMenuProps) => {
    const router = useRouter();
    const { user } = useUser();
    
    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({id: documentId});

        toast.promise(promise, {
            loading: "Archiving note",
            success: "Note archived!",
            error: "Failed to archive note"
        });

        router.push("/documents");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Archive className="h-5 w-5 mr-2" />
                    Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-sm text-muted-foreground p-2">
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

DocsMenu.Skeleton = function DocsMenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10" />
    )
};