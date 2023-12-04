"use client"

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { File } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/useSearch";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);

    const [isMouted, setIsMouted] = useState(false);
    
    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
      setIsMouted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    };

    if (!isMouted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search ${user?.lastName}'s Memotivate`}
            />
            <CommandList>
                <CommandEmpty>No Results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((document) => (
                        <CommandItem 
                            title={document.title}
                            key={document._id}
                            value={`${document._id}-${document.title}`}
                            onSelect={onSelect}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ): (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>
                                {document.title}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
};