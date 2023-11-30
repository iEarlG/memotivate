"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { LoadingSpinner } from "@/components/LoadingSpinner";

export const TrashBox = () => {
    const [search, setSearch] = useState("");

    const router = useRouter();
    const params = useParams();

    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restoreDocs);
    const remove = useMutation(api.documents.removeDocs);

    const filteredDocuments = documents?.filter((document) => {
        document.title
        .toLowerCase()
        .includes(search.toLowerCase())
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

    const onRemove = (documentId: Id<"documents">) => {

        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "Deleting documents",
            success: "Document deleted!",
            error: "Failed to delete document."
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
        <div>
            TrashBox
        </div>
    )
};