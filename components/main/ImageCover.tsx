"use client"

import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { useCoverImage } from "@/hooks/useCoverImage";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { ImagePlus, X } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ImageCoverProps {
    url?: string;
    preview?: boolean;
};

export const ImageCover = ({
    url,
    preview
}: ImageCoverProps) => {
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemoveImage = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url,
            });
        }

        removeCoverImage({
            id: params.documentId as Id<"documents">,
        });
    };

    return (
        <div className={cn("relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image 
                    alt="Cover Image"
                    src={url}
                    className="object-cover"
                    fill
                />
            )}
            {url && !preview && (
                <div className="flex items-center absolute opacity-0 group-hover:opacity-100 gap-x-2 bottom-5 right-5">
                    <Button 
                        size="sm"
                        variant="secondary"
                        className="text-muted-foreground text-xs"
                        onClick={() => coverImage.onReplace(url)}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Change Cover
                    </Button>
                    <Button 
                        size="sm"
                        variant="secondary"
                        className="text-muted-foreground text-xs"
                        onClick={onRemoveImage}
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
};