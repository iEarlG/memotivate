"use client"

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Navigation } from "@/components/main/Navigation";

const LayoutMain = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return redirect("/");
    }

    return (
        <div className="h-full flex dark:bg-[#0F0F0F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
 
export default LayoutMain;