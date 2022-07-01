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
        <div className="sk-fold" style={style}>
            <div className="sk-fold-cube"></div>
            <div className="sk-fold-cube"></div>
            <div className="sk-fold-cube"></div>
            <div className="sk-fold-cube"></div>
        </div>
    );
}
