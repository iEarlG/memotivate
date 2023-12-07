"use client"

import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import TextareaAutoSize from "react-textarea-autosize";

import { ImagePlus, SmilePlus, X } from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

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
    const [isEditing, setIsEditing] = useState(false);
    const [isValue, setIsValue] = useState(initialData.title);

    const inputRef = useRef<ElementRef<"textarea">>(null);

    const update = useMutation(api.documents.update);

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setIsValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onInput = (value: string) => {
        setIsValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled",
        })
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput(); 
        }
    };

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
            <div className="flex items-center gap-x-1 opacity-0 group-hover:opacity-100 py-4">
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
                {!initialData.coverImage && !preview && (
                    <Button 
                        size="sm"
                        variant="outline"
                        className="text-muted-foreground text-xs"
                        onClick={() => {}}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutoSize 
                    value={isValue}
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    onChange={(event) => onInput(event.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3A3939] dark:text-[#CFCFCF] resize-none"
                />
            ): (
                <div 
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3A3939] dark:text-[#CFCFCF]"
                    onClick={enableInput}
                >
                    {initialData.title}
                </div>
            )}
        </div>
    )
};