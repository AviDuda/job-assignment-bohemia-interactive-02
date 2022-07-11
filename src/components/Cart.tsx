import Image from "next/future/image";
import { MouseEvent, useLayoutEffect, useRef } from "react";

import { CartContext } from "../context/CartContext";
import { getImageTitle } from "../utils";

import Button from "./Button";
import SvgCloseIcon from "./svg/SvgCloseIcon";

interface CartProps {
    onCartOpenChange: (e: MouseEvent) => unknown;
}

export default function Cart({ onCartOpenChange }: CartProps) {
    const cart = CartContext.useContainer();

    const cartRef = useRef<HTMLDivElement | null>(null);

    const cartEntries = [...cart.cartProducts.entries()];

    useLayoutEffect(() => {
        // A little hack to keep the cart sticky without shifting down the main content
        // when the user opens cart without scrolling first
        if (!cartRef.current) return;
        if (window.scrollY === 0) window.scrollBy({ top: cartRef.current.clientHeight + 5 });
    });

    return (
        <div
            className="fixed left-0 top-24 z-modal flex h-[calc(100%-6rem)] w-full flex-col gap-6 overscroll-contain border-4 border-t-[1px] border-light-200 bg-white px-6 py-7 dark:border-dark-700 dark:bg-dark-900 sm:sticky sm:left-full sm:h-[inherit] sm:max-h-max sm:min-w-[20rem] sm:max-w-fit lg:top-32"
            ref={cartRef}
        >
            <h2 className="sr-only" id="dialog-label-cart">
                Cart
            </h2>
            <a href="#" onClick={onCartOpenChange} className="self-end" title="Close cart" aria-label="Close cart">
                <SvgCloseIcon />
            </a>
            <div className="flex flex-col gap-8 overflow-auto overscroll-contain scrollbar-thin scrollbar-track-light-200 scrollbar-thumb-light-400 dark:scrollbar-thumb-dark-700 dark:scrollbar-track-dark-900">
                {cartEntries.length === 0 && (
                    <div className="text-center text-xl font-bold text-light-500 dark:text-dark-400">
                        Ready to go shopping?
                    </div>
                )}
                {cartEntries.map(([productId, product]) => (
                    <div key={productId} className="flex flex-col items-center gap-4 sm:flex-row sm:gap-12">
                        <div className="flex-1 text-center sm:text-start">
                            <h4 className="text-xl font-bold sm:max-w-[50vw]">{product.title}</h4>
                            <p className="text-3xl text-light-600 dark:text-dark-400">${[product.price]}</p>
                        </div>
                        <Image
                            src={product.image.small}
                            alt={product.title}
                            title={getImageTitle(product)}
                            width={product.width / (product.height / 64)}
                            height={64}
                            className="-order-1 h-auto max-h-24 min-h-[2rem] w-auto min-w-[2rem] object-contain sm:order-none"
                        />
                    </div>
                ))}
            </div>
            {cartEntries.length > 0 && (
                <div className="mt-auto border-t-2 border-t-light-300 pt-8 dark:border-t-dark-700 sm:mt-0">
                    <Button
                        href="#"
                        invert={true}
                        className="block"
                        onClick={(e) => {
                            e.preventDefault();
                            cart.clearCart();
                        }}
                    >
                        CLEAR
                    </Button>
                </div>
            )}
        </div>
    );
}
