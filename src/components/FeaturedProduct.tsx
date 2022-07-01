import Image from "next/image";

import { PeopleAlsoBuy } from "../../pages";
import { MinimalProduct, StoreProduct } from "../api";

import Button from "./Button";

interface FeaturedProductProps {
    featured: MinimalProduct & Pick<StoreProduct, "description">;
    peopleAlsoBuy: PeopleAlsoBuy[];
}

export default function FeaturedProduct({ featured, peopleAlsoBuy }: FeaturedProductProps) {
    return (
        <section className="border-b-2 border-gray-200 pb-16">
            <div className="flex items-center justify-between py-6">
                <h2 className="text-3xl font-bold">{featured.title}</h2>
                <Button href="#" className="ml-8 min-w-fit">
                    ADD TO CART
                </Button>
            </div>
            <div className="relative h-[553px] w-full">
                <Image src={featured.image.large} alt={featured.title} layout="fill" objectFit="cover" />
                <div className="absolute bottom-0 left-0 bg-white px-14 py-4 text-xl font-bold text-black">
                    Photo of the day
                </div>
            </div>
            <div className="grid justify-between gap-8 py-12 lg:grid-cols-2">
                <div>
                    <h3 className="pb-2 text-xl font-bold leading-6">About the {featured.title}</h3>
                    <h4 className="pb-3 text-xl font-bold capitalize leading-6 text-gray-600">
                        {featured.tags[0] ?? null}
                    </h4>
                    <div className="prose-lg whitespace-pre-wrap text-lg leading-relaxed text-gray-600">
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
                                        title={product.title}
                                        width={117}
                                        height={147}
                                        objectFit="cover"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className="pb-2 text-xl font-bold leading-6">Details</h3>
                        <p className="text-gray-600">
                            Size: {featured.width} x {featured.height} pixels
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
