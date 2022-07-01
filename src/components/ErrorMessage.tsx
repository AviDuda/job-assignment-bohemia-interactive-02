interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return <div className="bg-red-600 p-4">{message}</div>;
}
