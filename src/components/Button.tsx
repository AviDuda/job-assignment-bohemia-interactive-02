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
    const defaultColors = {
        normal: "bg-black text-white outline-black hover:bg-white hover:text-black hover:outline-black",
        inverted: "bg-white text-black outline-black hover:bg-black hover:text-white",
    };

    return (
        <a
            href={href}
            onClick={onClick}
            className={clsx(
                `py-2 px-10 text-center text-2xl font-medium tracking-widest outline outline-2 outline-offset-[-2px]`,
                !invert && defaultColors.normal,
                invert && defaultColors.inverted,
                className,
            )}
        >
            {children}
        </a>
    );
}
