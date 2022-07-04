interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return <div className="h-min bg-red-700 px-16 py-4 text-2xl text-gray-200">{message}</div>;
}
