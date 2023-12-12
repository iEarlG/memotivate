"use client"

import { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";

import { useCoverImage } from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/SingleImage";

export const CoverImageModal = () => {
    const [isFile, setIsFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const update = useMutation(api.documents.update);

    const onChangeCover = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setIsFile(file);

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            });

            await update({ 
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            });

            onClosed();
        }
    };

    const onClosed = () => {
        setIsFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={isFile}
                    onChange={onChangeCover}
                />
            </DialogContent>
        </Dialog>
    )
};