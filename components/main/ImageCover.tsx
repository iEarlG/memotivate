"use client"

import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";

interface ImageCoverProps {
    url?: string;
    preview?: boolean;
};

export const ImageCover = ({
    url,
    preview
}: ImageCoverProps) => {

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
                        onClick={() => {}}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Change Cover
                    </Button>
                    <Button 
                        size="sm"
                        variant="secondary"
                        className="text-muted-foreground text-xs"
                        onClick={() => {}}
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
};