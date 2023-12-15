"use client"

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                alt="Error"
                src="/error.png"
                height="300"
                width="300"
                className="dark:hidden"
            />
            <Image 
                alt="Error"
                src="/error-dark.png"
                height="300"
                width="300"
                className="dark:block hidden"
            />
            <h2 className="text-xl font-medium">
                Oops, something went wrong. <span className="dark:text-emerald-600">DONT GO HERE!</span>
            </h2>
            <Button asChild>
                <Link href="/documents">
                    Go home
                </Link>
            </Button>
        </div>
    );
}
 
export default Error;