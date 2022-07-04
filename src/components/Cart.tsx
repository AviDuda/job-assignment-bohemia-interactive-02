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
            className="fixed left-0 top-24 z-modal flex h-[calc(100%-6rem)] w-full flex-col gap-6 overscroll-contain border-4 border-t-[1px] border-gray-200 bg-white px-6 py-7 sm:sticky sm:left-full sm:h-[inherit] sm:max-h-max sm:max-w-max lg:top-32"
            ref={cartRef}
        >
            <a href="#" onClick={onCartOpenChange} className="self-end">
                <SvgCloseIcon />
            </a>
            <div className="flex flex-col gap-8 overflow-scroll border-b-2 border-b-gray-300 pb-8 sm:overflow-auto">
                {cartEntries.length === 0 && (
                    <div className="text-xl font-bold text-gray-500">Ready to go shopping?</div>
                )}
                {cartEntries.map(([productId, product]) => (
                    <div key={productId} className="grid auto-rows-fr gap-5 sm:grid-cols-6">
                        <div className="sm:col-span-5">
                            <h4 className="text-xl font-bold sm:max-w-[50vw]">{product.title}</h4>
                            <p className="text-3xl text-gray-600">${[product.price]}</p>
                        </div>
                        <div className="relative order-first sm:order-none">
                            <Image src={product.image.small} layout="fill" objectFit="contain" alt={product.title} />
                        </div>
                    </div>
                ))}
            </div>
            <Button
                href="#"
                invert={true}
                className="mt-auto sm:mt-0"
                onClick={(e) => {
                    e.preventDefault();
                    cart.clearCart();
                }}
            >
                CLEAR
            </Button>
        </div>
    );
}
