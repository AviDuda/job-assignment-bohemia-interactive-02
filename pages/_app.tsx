import type { AppProps } from "next/app";

import { ModalContext } from "../src/context/ModalContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ModalContext.Provider>
            <Component {...pageProps} />
        </ModalContext.Provider>
    );
}

export default MyApp;
