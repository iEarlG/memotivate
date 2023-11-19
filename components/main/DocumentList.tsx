"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel"

import { Items } from "@/components/main/Items";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[]; 
}

export const DocumentList = ({
    parentDocumentId,
    level = 0,
    data
}: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId
    });

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    };

    if (documents === undefined) {
        return (
            <>
                <Items.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Items.Skeleton level={level} />
                        <Items.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }

    return (
        <>
            <p 
                style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}
                className={cn("hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
            >
                No documents were found.
            </p>
            {documents.map((document) => (
                <div key={document._id}>
                    <Items 
                        id={document._id}
                        onClick={() => onRedirect(document._id)}
                        label={document.title}
                        icon={FileIcon}
                        documentsIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={() => onExpand(document._id)}
                        expanded={expanded[document._id]}
                    />
                    {expanded[document._id] && (
                        <DocumentList 
                            parentDocumentId={document._id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </>
    )
}