import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
    href: string;
    invert?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children?: ReactNode;
}

export default function Button({ href, onClick, invert = false, className = "", children }: ButtonProps) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={clsx(
                `py-2 px-10 text-center text-2xl font-medium tracking-widest outline outline-2 outline-offset-[-2px] focus:ring-2 focus:ring-inset focus:ring-offset-2`,
                !invert &&
                    "bg-black text-white outline-black hover:bg-white hover:text-black hover:outline-black focus:ring-white dark:bg-white dark:text-black dark:outline-white dark:hover:bg-black dark:hover:text-white dark:hover:outline-black dark:focus:ring-black",
                invert &&
                    "bg-white text-black outline-black hover:bg-black hover:text-white focus:ring-black dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black dark:focus:ring-white",
                className,
            )}
        >
            {children}
        </a>
    );
}
