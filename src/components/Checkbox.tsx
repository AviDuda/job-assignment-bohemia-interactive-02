import { ChangeEventHandler } from "react";

interface ErrorMessageProps {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    labelClassName?: string;
}

export default function Checkbox({ label, onChange, labelClassName = "" }: ErrorMessageProps) {
    return (
        <label className="flex items-center pb-10">
            <input
                type="checkbox"
                onChange={onChange}
                className="grid h-6 w-6 appearance-none place-content-center border-2 border-black text-black focus:ring-2 focus:ring-current"
            />
            <span className={`select-none pl-6 text-xl text-gray-900 ${labelClassName}`}>{label}</span>
        </label>
    );
}
