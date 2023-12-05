"use client"

import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DocsTitleProps {
    initialData: Doc<"documents">;
};

export const DocsTitle = ({
    initialData,
}: DocsTitleProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isTitle, setIsTitle] = useState(initialData.title || "Untitled");

    const inputRef = useRef<HTMLInputElement>(null);
    const update = useMutation(api.documents.update);
    
    const enableInput = () => {
        setIsTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef?.current?.focus();
            inputRef?.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0)
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const handleTitleEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTitle(event.target.value);
        update({ 
            id: initialData._id,
            title: event.target.value || "Untitled",
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            disableInput();
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && (
                <p>{initialData.icon}</p>
            )}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={handleTitleEditing}
                    onKeyDown={handleKeyDown}
                    value={isTitle}
                    className="h-7 px-2 focus-visible:ring-transparent"
                />
            ): (
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-auto p-1"
                    onClick={enableInput}
                >
                    <span className="truncate">
                        {initialData.title}
                    </span>
                </Button>
            )}
        </div>
    )
};