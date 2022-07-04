import { useRef, useEffect } from "react";

export const useComponentDidMount = () => {
    const ref = useRef(false);
    useEffect(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        };
    }, []);
    return ref.current;
};
