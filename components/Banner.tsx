"use client"

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface BannerProps {
    documentId: Id<"documents">;
    initialData: Doc<"documents">;
};

export const Banner = ({
    documentId,
    initialData
}: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.removeDocs);
    const restore = useMutation(api.documents.restoreDocs);

    const onRemove = () => {
        const promise = remove({id: documentId})

        toast.promise(promise, {
            loading: "Deleting note",
            success: "Note deleted!",
            error: "Failed to delete note"
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "Restoring note",
            success: "Note restored!",
            error: "Failed to restore note"
        });
    };

    return (
        <div className="w-full flex items-center justify-center bg-rose-500 text-center text-sm p-2 text-white gap-x-2">
            <p>
                <span className="font-bold">{initialData?.title}</span> has been archived.
            </p>
            <Button
                size="sm"
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto"
                onClick={onRestore}
            >
                Restore
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto"
                >
                    Delete permanently
                </Button>
            </ConfirmModal>
        </div>
    )
};