import clsx from "clsx";
import Image from "next/image";

import { MinimalProduct, StoreProduct } from "../apiTypes";
import { CartContext } from "../context/CartContext";
import { ModalContext } from "../context/ModalContext";

import Button from "./Button";

interface FeaturedProductProps {
    featured: MinimalProduct & Pick<StoreProduct, "description">;
    peopleAlsoBuy: MinimalProduct[];
}

export default function FeaturedProduct({ featured, peopleAlsoBuy }: FeaturedProductProps) {
    const { addToCart, cartProducts } = CartContext.useContainer();
    const { showModal } = ModalContext.useContainer();

    return (
        <section
            className="border-b-2 border-gray-200 pb-16 dark:border-zinc-700"
            itemScope
            itemType="https://schema.org/Product"
        >
            <link itemProp="availability" href="https://schema.org/InStock" />
            <div className="hidden" aria-hidden itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="priceCurrency" content="USD" />
                <meta itemProp="price" content={featured.price.toFixed(2)} />
            </div>
            <div className="my-6 flex flex-wrap place-content-center place-items-center gap-4">
                <h2 className="flex-grow break-words text-center text-3xl font-bold lg:text-left" itemProp="name">
                    {featured.title}
                </h2>
                <Button
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        cartProducts.has(featured.id) ? showModal("cart", false) : addToCart(featured);
                    }}
                    className="uppercase"
                >
                    {cartProducts.has(featured.id) ? "☑️ In cart" : "Add to cart"}
                </Button>
            </div>
            <div className="relative mb-12 h-[553px] w-full">
                <Image
                    src={featured.image.large}
                    alt={featured.title}
                    title={`Image by ${featured.user.first_name} ${featured.user.last_name}${
                        typeof featured.user.username === "string" ? ` (${featured.user.username})` : ""
                    }`}
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                    style={{ backgroundColor: `rgb(${featured.main_color.join(", ")})` }}
                    itemProp="image"
                />
                <div className="absolute bottom-0 left-0 bg-white p-4 text-xl font-bold text-black dark:bg-black dark:text-white sm:px-14">
                    Photo of the day
                </div>
            </div>
            <div className="grid grid-cols-1 justify-between gap-8 lg:grid-cols-2">
                <div>
                    <h3 className="pb-2 text-xl font-bold leading-6">About the {featured.title}</h3>
                    {featured.tags[0] && (
                        <h4
                            className="pb-3 text-xl font-bold capitalize leading-6 text-gray-600 dark:text-zinc-400"
                            itemProp="category"
                        >
                            {featured.tags[0]}
                        </h4>
                    )}
                    <div
                        className="prose-lg whitespace-pre-wrap leading-normal text-gray-600/90 dark:text-zinc-400"
                        itemProp="description"
                    >
                        {featured.description}
                    </div>
                </div>
                <div className="flex flex-col-reverse justify-between gap-14 text-center lg:flex-col lg:gap-4 lg:text-right">
                    {peopleAlsoBuy && (
                        <div>
                            <h3 className="pb-7 text-xl font-bold leading-6">People also buy</h3>
                            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row lg:justify-end">
                                {peopleAlsoBuy.map((product) => {
                                    const isProductInCart = cartProducts.has(product.id);
                                    return (
                                        <div
                                            key={product.id}
                                            itemScope
                                            itemType="https://schema.org/Product"
                                            className="group flex w-32 flex-col"
                                        >
                                            <meta itemProp="name" content={product.title} />
                                            <link itemProp="availability" href="https://schema.org/InStock" />
                                            <meta itemProp="width" content={product.width.toString()} />
                                            <meta itemProp="height" content={product.height.toString()} />
                                            <div
                                                className="hidden"
                                                aria-hidden
                                                itemProp="offers"
                                                itemScope
                                                itemType="https://schema.org/Offer"
                                            >
                                                <meta itemProp="priceCurrency" content="USD" />
                                                <meta itemProp="price" content={product.price.toFixed(2)} />
                                            </div>
                                            <Image
                                                src={product.image.medium}
                                                alt={product.title}
                                                title={`Image of "${product.title}" by ${product.user.first_name} ${
                                                    product.user.last_name
                                                }${
                                                    typeof product.user.username === "string"
                                                        ? ` (${product.user.username})`
                                                        : ""
                                                }`}
                                                width={128}
                                                height={144}
                                                objectFit="cover"
                                                itemProp="image"
                                                className="flex-grow-0"
                                                style={{ backgroundColor: `rgb(${product.main_color.join(", ")})` }}
                                            />
                                            <Button
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    isProductInCart ? showModal("cart", false) : addToCart(product);
                                                }}
                                                className={clsx(
                                                    "visible block flex-shrink flex-grow-0 px-2 text-sm uppercase group-hover:visible",
                                                    !isProductInCart && "lg:invisible",
                                                )}
                                            >
                                                {isProductInCart ? "☑️ In cart" : "Add to cart"}
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className="pb-2 text-xl font-bold leading-6">Details</h3>
                        <p className="text-gray-600 dark:text-zinc-400">
                            Size: <span itemProp="width">{featured.width}</span> x{" "}
                            <span itemProp="height">{featured.height}</span> pixels
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
