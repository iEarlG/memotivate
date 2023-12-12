"use client"

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    if (document === undefined) {
        return (
            <div>
                Loading...
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

    return (
        <div className="pb-40">
            <ImageCover url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
            </div>
        </div>
    );
}
 
export default DocumentId;