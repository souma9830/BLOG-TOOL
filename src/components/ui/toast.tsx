import { cn } from "@/lib/utils"

export interface ToastProps {
    message: string;
    isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
    return (
        <div
            className={cn(
                "fixed bottom-8 right-8 z-50 transition-all duration-300 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
            )}
        >
            <div className="bg-primary text-primary-foreground px-6 py-3 brutalist-border-sm brutalist-shadow-sm font-bold text-sm">
                {message}
            </div>
        </div>
    );
}
