import clsx from "clsx";
import Image from "next/future/image";

import { MinimalProduct } from "../apiTypes";
import { CartContext } from "../context/CartContext";
import { ModalContext } from "../context/ModalContext";
import { getImageTitle } from "../utils";

import Button from "./Button";

interface ProductCardProps {
    product: MinimalProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, cartProducts } = CartContext.useContainer();
    const { showModal } = ModalContext.useContainer();

    const isProductInCart = cartProducts.has(product.id);

    return (
        <article className="group flex flex-col gap-2" itemScope itemType="https://schema.org/Product">
            <meta itemProp="width" content={product.width.toString()} />
            <meta itemProp="height" content={product.height.toString()} />
            <div className="relative h-96 w-full" style={{ backgroundColor: `rgb(${product.main_color.join(", ")})` }}>
                <Image
                    src={product.image.medium}
                    alt={product.title}
                    title={getImageTitle(product)}
                    width={product.width / (product.height / 384)}
                    height={384}
                    className="h-full w-full object-contain"
                    itemProp="image"
                />
                {product.bestseller && (
                    <div className="absolute top-0 left-0 bg-white px-2 py-1 text-center text-xl dark:bg-black">
                        Best Seller
                    </div>
                )}
                <Button
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        isProductInCart ? showModal("cart", false) : addToCart(product);
                    }}
                    className={clsx(
                        "absolute bottom-0 left-0 w-full px-4 uppercase group-hover:block",
                        !isProductInCart && "lg:hidden",
                    )}
                >
                    {isProductInCart ? "☑️ In cart" : "Add to cart"}
                </Button>
            </div>
            <p className="text-xl font-bold" title={product.tags.join(", ")}>
                <span className="capitalize text-light-600 dark:text-dark-400" itemProp="category">
                    {product.tags[0]}
                </span>
                {product.tags.length > 1 && (
                    <span className="text-light-500/80 dark:text-dark-500"> + {product.tags.length - 1} more</span>
                )}
            </p>
            <h3 className="text-4xl font-bold" itemProp="name">
                {product.title}
            </h3>
            <p
                className="text-3xl text-light-600 dark:text-dark-400"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
            >
                <span itemProp="priceCurrency" {...{ content: "USD" }}>
                    $
                </span>
                <span itemProp="price" {...{ content: product.price.toFixed(2) }}>
                    {product.price.toFixed(2)}
                </span>
                <link itemProp="availability" href="https://schema.org/InStock" />
            </p>
        </article>
    );
}
