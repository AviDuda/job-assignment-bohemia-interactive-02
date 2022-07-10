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
                "bg-red-700 h-min px-16 py-4 text-2xl",
                type === "error" && "bg-red-700 text-light-200",
                type === "info" && "bg-light-300 text-current dark:bg-dark-700",
            )}
        >
            {message}
        </div>
    );
}
