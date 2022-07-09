import clsx, { ClassValue } from "clsx";
import { ChangeEventHandler } from "react";

interface ErrorMessageProps {
    label: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    labelClassName?: ClassValue;
}

export default function Checkbox({ label, checked, onChange, labelClassName }: ErrorMessageProps) {
    return (
        <label className="mb-10 flex max-w-[90%] cursor-pointer flex-wrap items-center gap-6 pl-1">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="grid h-9 w-9 cursor-pointer appearance-none place-content-center border-2 border-black text-black focus:ring-2 focus:ring-current dark:border-zinc-800 dark:bg-zinc-700 dark:text-zinc-800 dark:checked:border-zinc-600 lg:h-6 lg:w-6"
            />
            <span
                className={clsx(
                    "flex-1 select-none text-3xl text-gray-900 dark:text-zinc-200 lg:text-xl",
                    labelClassName,
                )}
            >
                {label}
            </span>
        </label>
    );
}
