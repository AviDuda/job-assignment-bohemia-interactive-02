import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="bg-white transition-colors duration-300 motion-reduce:transition-none">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
