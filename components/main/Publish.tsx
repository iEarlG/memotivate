"use client"

import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "convex/react";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { useOrigin } from "@/hooks/useOrigin";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
    initialData: Doc<"documents">;
};

export const Publish = ({
    initialData
}: PublishProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const origin = useOrigin();
    const update = useMutation(api.documents.update);
    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Publishing note!",
            success: "Note Published!",
            error: "Failed to publish note!"
        })
    };

    const onUnPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "UnPublishing note!",
            success: "Note UnPublished!",
            error: "Failed to unpublish note!"
        })
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000)
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                >
                    Publish
                    {initialData.isPublished && (
                        <Globe className="h-4 w-4 ml-2 text-sky-500" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                align="end"
                alignOffset={8}
                className="w-72"
                forceMount 
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="h-4 w-4 animate-pulse text-sky-500" />
                            <p className="text-sm font-medium"><span className="dark:text-emerald-500">{initialData?.title}</span> note is live on Web.</p>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="text"
                                className="flex-1 h-8 bg-muted px-2 py-1 text-xs border rounded-l-md"
                                value={url}
                                readOnly
                                disabled
                            />
                            <Button
                                size="sm"
                                className="h-8 rounded-l-none"
                                onClick={onCopy}
                                disabled={isCopied}
                            >
                                {isCopied ? (
                                    <Check className="h-4 w-4 mr-2" />
                                ): (
                                   <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={onUnPublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ): (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-2">Publish this note</p>
                        <span className="text-xs text-muted-foreground mb-4">Share your work with others.</span>
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={onPublish}
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};