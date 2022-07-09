import clsx from "clsx";
import { ReactNode } from "react";

interface MessageProps {
    type: "error" | "info";
    message: ReactNode;
}

export default function Message({ type, message }: MessageProps) {
    return (
        <div
            className={clsx(
                "h-min bg-red-700 px-16 py-4 text-2xl",
                type === "error" && "bg-red-700 text-gray-200",
                type === "info" && "bg-gray-300 text-current dark:bg-zinc-700",
            )}
        >
            {message}
        </div>
    );
}
