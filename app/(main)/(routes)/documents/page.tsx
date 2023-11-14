"use client"

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

import { PlusCircle } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" });

        toast.promise(promise, {
            loading: "Creating new notes",
            success: "Notes created",
            error: "Failed to create notes"
        })
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                alt="404"
                src="/empty.png"
                width="300"
                height="300"
                className="dark:hidden"
            />
            <Image 
                alt="404"
                src="/empty-dark.png"
                width="300"
                height="300"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to Memotivate <span className="dark:text-emerald-700">{user?.firstName}</span>
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Start Memotivate
            </Button>
        </div>
    );
}
 
export default DocumentsPage;