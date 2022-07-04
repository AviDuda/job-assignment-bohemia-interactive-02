import clsx from "clsx";
import { MouseEvent, ReactNode } from "react";

import { CartContext } from "../context/CartContext";
import { ModalContext } from "../context/ModalContext";

import Cart from "./Cart";
import Meta from "./Meta";
import SvgCartIcon from "./svg/SvgCartIcon";
import SvgCompanyLogo from "./svg/SvgCompanyLogo";

interface MetaProps {
    title?: string;
    description?: string;
    children?: ReactNode;
}

export default function PageWrapper({ title, description, children }: MetaProps) {
    const { currentModal, modalHasOverlay, toggleModal, closeModal } = ModalContext.useContainer();
    const cart = CartContext.useContainer();

    function handleCartOpenChange(e: MouseEvent) {
        e.preventDefault();
        toggleModal("cart", false);
    }

    return (
        <div>
            <div className="flex flex-col bg-white px-8 pb-16">
                <Meta title={title} description={description} />

                <header className="container sticky top-0 left-0 z-header flex h-24 flex-wrap items-center justify-between border-b-2 border-gray-200 bg-white lg:h-32">
                    <div className="pt-5">
                        <SvgCompanyLogo className="h-5 lg:h-6" />
                    </div>
                    <a
                        href="#"
                        onClick={handleCartOpenChange}
                        title="View cart"
                        className="relative mr-4 h-8 w-8 lg:h-14 lg:w-14"
                    >
                        <SvgCartIcon />
                        <span className="absolute left-7 top-7 bg-black px-1 pb-1 text-center text-base font-bold leading-4 tracking-widest text-white lg:left-12 lg:top-12 lg:text-xl lg:leading-5">
                            {cart.cartProducts.size}
                        </span>
                    </a>
                </header>

                <main className="container relative flex grow flex-col">
                    {currentModal === "cart" && <Cart onCartOpenChange={handleCartOpenChange} />}
                    {children}
                </main>
            </div>
            {currentModal && (
                <div
                    className={clsx(
                        "fixed top-0 left-0 z-modal-overlay h-full w-full",
                        modalHasOverlay && "bg-black opacity-20 transition-opacity",
                    )}
                    onClick={() => closeModal()}
                ></div>
            )}
        </div>
    );
}
