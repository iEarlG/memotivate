"use client"

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your ideas, notes, & plans, are all in one place. Welcome to <span className="underline">Memotivate</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Memotivate is a note-taking app that helps you organize your <br /> 
                thoughts and ideas, and keep track of your tasks and goals.
            </h3>
            <Button>
                Be Memotivate
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
}