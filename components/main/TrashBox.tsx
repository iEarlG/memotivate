"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import { Search, Trash, Undo } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Input } from "@/components/ui/input";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ConfirmModal } from "../modals/ConfirmModal";

export const TrashBox = () => {
    const [search, setSearch] = useState("");

    const router = useRouter();
    const params = useParams();

    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restoreDocs);
    const remove = useMutation(api.documents.removeDocs);

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase())
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">) => {
        event.stopPropagation();

        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "Restoring document",
            success: "Document restored!",
            error: "Failed to restore document."
        });
    };

    const onRemove = (documentId: Id<"documents">,) => {
        const promise = remove({ id: documentId });
    
        toast.promise(promise, {
          loading: "Deleting note...",
          success: "Note deleted!",
          error:" Failed to delete note."
        });
    
        if (params.documentId === documentId) {
          router.push("/documents");
        }
      };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <LoadingSpinner size="lg" />
            </div>
        );
    };

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input 
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Search by title"
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-sm text-center text-muted-foreground pb-2">No documents or notes were found.</p>
                {filteredDocuments?.map((document) => (
                    <div 
                        role="button"
                        key={document._id}
                        onClick={() => onClick(document._id)}
                        className="w-full flex items-center justify-between text-primary hover:bg-primary/5 text-sm rounded-sm"
                    >
                        <span className="truncate-12 pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div 
                                role="button"
                                className="rounded-sm hover:bg-neutral-200 p-2"
                                onClick={(e) => onRestore(e, document._id)}
                            >
                                <Undo className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                <div role="button" className="rounded-sm hover:bg-neutral-200 p-2">
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};