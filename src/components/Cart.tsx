import Image from "next/image";
import { MouseEvent, useLayoutEffect, useRef } from "react";

import { CartContext } from "../context/CartContext";

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
            className="fixed left-0 top-24 z-modal flex h-[calc(100%-6rem)] w-full flex-col gap-6 overscroll-contain border-4 border-t-[1px] border-gray-200 bg-white px-6 py-7 dark:border-zinc-700 dark:bg-zinc-900 sm:sticky sm:left-full sm:h-[inherit] sm:max-h-max sm:min-w-[20rem] sm:max-w-fit lg:top-32"
            role="dialog"
            ref={cartRef}
        >
            <a href="#" onClick={onCartOpenChange} className="self-end" title="Close cart" aria-label="Close cart">
                <SvgCloseIcon />
            </a>
            <div className="flex flex-col gap-8 overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-900 sm:overflow-auto">
                {cartEntries.length === 0 && (
                    <div className="text-center text-xl font-bold text-gray-500 dark:text-zinc-400">
                        Ready to go shopping?
                    </div>
                )}
                {cartEntries.map(([productId, product]) => (
                    <div key={productId} className="grid auto-rows-fr gap-5 sm:grid-cols-4">
                        <div className="sm:col-span-3">
                            <h4 className="text-xl font-bold sm:max-w-[50vw]">{product.title}</h4>
                            <p className="text-3xl text-gray-600 dark:text-zinc-400">${[product.price]}</p>
                        </div>
                        <div className="relative order-first min-w-[4rem] sm:order-none">
                            <Image src={product.image.small} layout="fill" objectFit="contain" alt={product.title} />
                        </div>
                    </div>
                ))}
            </div>
            {cartEntries.length > 0 && (
                <div className="mt-auto border-t-2 border-t-gray-300 pt-8 dark:border-t-zinc-700 sm:mt-0">
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
