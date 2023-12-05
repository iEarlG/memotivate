"use client"

import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useSettings } from "@/hooks/useSettings";

import { ModeToggle } from "@/components/ToggleMode";

export const SettingsModal = () => {
    const settings = useSettings();

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">Settings</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Appearance</Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize your memotivate in your own way.
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
};