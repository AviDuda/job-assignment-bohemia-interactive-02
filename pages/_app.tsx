import type { AppProps } from "next/app";

import { CartContext } from "../src/context/CartContext";
import { ModalContext } from "../src/context/ModalContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ModalContext.Provider>
            <CartContext.Provider>
                <Component {...pageProps} />
            </CartContext.Provider>
        </ModalContext.Provider>
    );
}

export default MyApp;
