"use client"

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landingpage/Logo";
import { ModeToggle } from "@/components/ToggleMode";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScroll();

    return (
        <div className={cn("fixed flex items-center w-full z-50 bg-background top-0 p-6 dark:bg-[#0F0F0F]",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="flex items-center w-full md:ml-auto md:justify-end justify-between gap-x-2">
                {isLoading && (
                    <div className="mr-5">
                        <LoadingSpinner />
                    </div>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">
                                Be Memotivate
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">
                                Memotivate
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
}