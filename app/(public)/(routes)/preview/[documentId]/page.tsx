"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Skeleton } from "@/components/ui/skeleton";

import { Toolbar } from "@/components/Toolbar";
import { ImageCover } from "@/components/main/ImageCover";

interface DocumentIdProps {
    params: {
        documentId: Id<"documents">;
    }
};

const DocumentId = ({
    params
}: DocumentIdProps) => {
    const Editor = useMemo(() => dynamic(() => import("@/components/main/Editor"), { ssr: false}), []);

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });
    const update = useMutation(api.documents.update);

    if (document === undefined) {
        return (
            <div>
                <ImageCover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        )
    };

    if (document === null) {
        return (
            <div>
                Document not found
            </div>
        )
    };

    const onWriteConten = (content: string) => {
        update({
            id: params.documentId,
            content
        })
    };

    return (
        <div className="pb-40">
            <ImageCover preview url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor 
                    editable={false}
                    initialContent={document.content} 
                    onChange={onWriteConten}
                />
            </div>
        </div>
    );
}
 
export default DocumentId;