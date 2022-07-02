import { useEffect, useState } from "react";

interface WindowSizeState {
    innerWidth?: number;
    innerHeight?: number;
}

export function useWindowSize(trackResizeOnInit = true) {
    const [windowSize, setWindowSize] = useState<WindowSizeState>({});
    const [shouldTrackResize, setShouldTrackResize] = useState(trackResizeOnInit);

    useEffect(() => {
        if (!shouldTrackResize) return;

        function handleResize() {
            setWindowSize({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
        }
        window.addEventListener("resize", handleResize, true);
        return () => {
            window.removeEventListener("resize", handleResize, true);
            setWindowSize({});
        };
    }, [shouldTrackResize]);

    return { ...windowSize, shouldTrackResize, setShouldTrackResize };
}
