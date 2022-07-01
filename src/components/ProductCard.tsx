import Image from "next/image";

import { StoreProduct } from "../api";

import Button from "./Button";

interface ProductCardProps {
    product: Pick<StoreProduct, "title" | "bestseller" | "image" | "price" | "main_color" | "tags">;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="flex flex-col gap-2">
            <div
                className={`relative h-96 w-full`}
                style={{ backgroundColor: `rgb(${product.main_color.join(", ")})` }}
            >
                <Image src={product.image.medium} alt={product.title} layout="fill" objectFit="contain" />
                {product.bestseller && (
                    <div className="absolute top-0 left-0 bg-white px-2 py-1 text-center text-xl">Best Seller</div>
                )}
                <Button href="#" className="absolute bottom-0 left-0 w-full pb-4">
                    ADD TO CART
                </Button>
            </div>
            <p className="text-xl font-bold" title={product.tags.join(", ")}>
                <span className="capitalize text-gray-600">{product.tags[0]}</span>
                {product.tags.length > 1 && <span className="text-gray-300"> + {product.tags.length - 1} more</span>}
            </p>
            <h3 className="text-4xl font-bold">{product.title}</h3>
            <p className="text-3xl text-gray-600">${product.price.toFixed(2)} </p>
        </article>
    );
}
