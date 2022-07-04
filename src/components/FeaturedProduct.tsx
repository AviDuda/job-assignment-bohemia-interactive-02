import Image from "next/image";

import { PeopleAlsoBuy } from "../../pages";
import { MinimalProduct, StoreProduct } from "../apiTypes";
import { CartContext } from "../context/CartContext";

import Button from "./Button";

interface FeaturedProductProps {
    featured: MinimalProduct & Pick<StoreProduct, "description">;
    peopleAlsoBuy: PeopleAlsoBuy[];
}

export default function FeaturedProduct({ featured, peopleAlsoBuy }: FeaturedProductProps) {
    const { addToCart } = CartContext.useContainer();

    return (
        <section className="border-b-2 border-gray-200 pb-16 dark:border-zinc-700">
            <div className="my-6 flex flex-wrap place-content-center place-items-center gap-4">
                <h2 className="flex-grow break-words text-center text-3xl font-bold lg:text-left">{featured.title}</h2>
                <Button
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(featured);
                    }}
                >
                    ADD TO CART
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
                />
                <div className="absolute bottom-0 left-0 bg-white p-4 text-xl font-bold text-black dark:bg-black dark:text-white sm:px-14">
                    Photo of the day
                </div>
            </div>
            <div className="grid justify-between gap-8 lg:grid-cols-2">
                <div>
                    <h3 className="pb-2 text-xl font-bold leading-6">About the {featured.title}</h3>
                    <h4 className="pb-3 text-xl font-bold capitalize leading-6 text-gray-600 dark:text-zinc-400">
                        {featured.tags[0] ?? null}
                    </h4>
                    <div className="prose-lg whitespace-pre-wrap leading-normal text-gray-600/90 dark:text-zinc-400">
                        {featured.description}
                    </div>
                </div>
                <div className="flex flex-col-reverse gap-14 text-center lg:flex-col lg:text-right">
                    {peopleAlsoBuy && (
                        <div>
                            <h3 className="pb-7 text-xl font-bold leading-6">People also buy</h3>
                            <div className="flex justify-center gap-8 lg:justify-end">
                                {peopleAlsoBuy.map((product) => (
                                    <Image
                                        key={product.id}
                                        src={product.image}
                                        alt={product.title}
                                        title={`Image of "${product.title}" by ${product.user.first_name} ${
                                            product.user.last_name
                                        }${
                                            typeof product.user.username === "string"
                                                ? ` (${product.user.username})`
                                                : ""
                                        }`}
                                        width={117}
                                        height={147}
                                        objectFit="cover"
                                        style={{ backgroundColor: `rgb(${product.main_color.join(", ")})` }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className="pb-2 text-xl font-bold leading-6">Details</h3>
                        <p className="text-gray-600 dark:text-zinc-400">
                            Size: {featured.width} x {featured.height} pixels
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
