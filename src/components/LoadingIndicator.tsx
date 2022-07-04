interface LoadingIndicatorProps {
    size?: string;
    color?: string;
    className?: string;
}

export default function LoadingIndicator({ size = "40px", color }: LoadingIndicatorProps) {
    const style: Record<string, string> = {
        "--sk-size": size,
    };
    if (color) style["--sk-color"] = color;

    return (
        <>
            <div className="sk-grid motion-reduce:hidden" style={style}>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
            </div>
            <div
                className="h-min bg-black p-8 text-2xl text-white motion-safe:hidden"
                style={{ backgroundColor: color }}
            >
                Loading...
            </div>
        </>
    );
}