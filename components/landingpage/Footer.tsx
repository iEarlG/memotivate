
import { Logo } from "@/components/landingpage/Logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#0F0F0F]">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Terms of Service
                </Button>
            </div>
        </div>
    );
}