"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";

import { SmilePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DocsEmojiPicker } from "@/components/EmojiPicker";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
};

export const Toolbar = ({
    initialData,
    preview
}: ToolbarProps) => {
    return (
        <div className="group relative pl-[54px]">
            {!!initialData.icon && !preview && (
                <div className="flex items-center group/icon gap-x-2 pt-6">
                    <DocsEmojiPicker onChange={() => {}}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </DocsEmojiPicker>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {}}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-sm"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className="flex items-center gap-x-1 opacity-100 group-hover:opacity-100 py-4">
                {!initialData.icon && !preview && (
                    <DocsEmojiPicker
                        asChild
                        onChange={() => {}}
                    >
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-muted-foreground text-sm"
                        >
                            <SmilePlus className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </DocsEmojiPicker>
                )}
            </div>
        </div>
    )
};