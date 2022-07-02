import { ChangeEventHandler } from "react";

interface ErrorMessageProps {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    labelClassName?: string;
}

export default function Checkbox({ label, onChange, labelClassName = "" }: ErrorMessageProps) {
    return (
        <label className="mb-10 flex w-fit cursor-pointer items-center pl-1">
            <input
                type="checkbox"
                onChange={onChange}
                className="grid h-9 w-9 cursor-pointer appearance-none place-content-center border-2 border-black text-black focus:ring-2 focus:ring-current lg:h-6 lg:w-6"
            />
            <span className={`select-none pl-6 text-3xl text-gray-900 lg:text-xl ${labelClassName}`}>{label}</span>
        </label>
    );
}
