
import Image from "next/image";

import { cn } from "@/lib/utils";

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image 
                alt="Memotivate logo"
                src="/dark-logo.svg"
                width="45"
                height="45"
                className="dark:hidden"
            />
            <Image 
                alt="Memotivate logo"
                src="/logo.svg"
                width="45"
                height="45"
                className="hidden dark:block"
            />
            <p className={cn("font-semibold")}>Memotivate</p>
        </div>
    );
}