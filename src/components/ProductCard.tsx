import Image from "next/image";

import { MinimalProduct } from "../apiTypes";
import { CartContext } from "../context/CartContext";
import { ModalContext } from "../context/ModalContext";

import Button from "./Button";

interface ProductCardProps {
    product: MinimalProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, cartProducts } = CartContext.useContainer();
    const { showModal } = ModalContext.useContainer();

    return (
        <article className="flex flex-col gap-2" itemScope itemType="https://schema.org/Product">
            <meta itemProp="width" content={product.width.toString()} />
            <meta itemProp="height" content={product.height.toString()} />
            <div className="relative h-96 w-full" style={{ backgroundColor: `rgb(${product.main_color.join(", ")})` }}>
                <Image
                    src={product.image.medium}
                    alt={product.title}
                    title={`Image by ${product.user.first_name} ${product.user.last_name}${
                        typeof product.user.username === "string" ? ` (${product.user.username})` : ""
                    }`}
                    layout="fill"
                    objectFit="contain"
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
                        cartProducts.has(product.id) ? showModal("cart", false) : addToCart(product);
                    }}
                    className="absolute bottom-0 left-0 w-full px-4 uppercase"
                >
                    {cartProducts.has(product.id) ? "☑️ In cart" : "Add to cart"}
                </Button>
            </div>
            <p className="text-xl font-bold" title={product.tags.join(", ")}>
                <span className="capitalize text-gray-600 dark:text-zinc-400" itemProp="category">
                    {product.tags[0]}
                </span>
                {product.tags.length > 1 && (
                    <span className="text-gray-300 dark:text-zinc-600"> + {product.tags.length - 1} more</span>
                )}
            </p>
            <h3 className="text-4xl font-bold" itemProp="name">
                {product.title}
            </h3>
            <p
                className="text-3xl text-gray-600 dark:text-zinc-400"
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
