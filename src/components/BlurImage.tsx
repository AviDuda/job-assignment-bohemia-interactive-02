import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export function BlurImage(props: ImageProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            {...props}
            alt={props.alt}
            className={clsx(
                props.className,
                "duration-300 ease-in-out",
                isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
            )}
            onLoadingComplete={() => setLoading(false)}
        />
    );
}
