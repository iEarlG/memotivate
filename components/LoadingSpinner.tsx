
import { Loader2 } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
    "text-muted-foreground animate-spin",
    {
        variants: {
            size: {
                default: "h-4 w-4",
                sm: "h-2 w-2",
                md: "h-6 w-6",
                lg: "h-8 w-8",
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
);

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const LoadingSpinner = ({
    size,
}: LoadingSpinnerProps) => {
    return (
        <Loader2 className={cn(spinnerVariants({ size }))} />
    );
}