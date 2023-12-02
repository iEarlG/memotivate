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
    const router = useRouter();
    const { user } = useUser();
};