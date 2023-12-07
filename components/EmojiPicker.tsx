"use client"

import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface EmojiPickerProps {
    children: React.ReactNode;
    asChild?: boolean;
    onChange: (icon: string) => void;
};

export const DocsEmojiPicker = ({
    children,
    asChild,
    onChange
}: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme();
    const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

    const themeMap = {
        "dark": Theme.DARK,
        "light": Theme.LIGHT
    };

    const theme = themeMap[currentTheme];
    
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-full border-none shadow-none p-0">
                <EmojiPicker 
                    height={350}
                    theme={theme}
                    onEmojiClick={(data) => onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    )
};