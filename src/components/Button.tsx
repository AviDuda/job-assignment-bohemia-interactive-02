import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
    href: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children?: ReactNode;
}

export default function Button({ href, onClick, className = "", children }: ButtonProps) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`bg-black px-10 py-2 text-center text-2xl font-medium tracking-widest text-white hover:text-gray-300 ${className}`}
        >
            {children}
        </a>
    );
}
