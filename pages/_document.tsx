import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className="min-h-screen break-words bg-white text-black transition-colors duration-300 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 motion-reduce:transition-none dark:bg-zinc-800 dark:text-white dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-900">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
