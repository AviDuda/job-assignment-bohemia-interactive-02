import { readFileSync } from "node:fs";
import path from "node:path";

export const PEXELS_DATA_PATH = path.join(process.cwd(), "data/pexels_data.json");
export const STORE_DATA_PATH = path.join(process.cwd(), "data/store_data.json");

export type StoreProduct = Pick<
    PexelsPhoto["attributes"],
    "id" | "slug" | "image" | "width" | "height" | "license" | "main_color" | "tags" | "user"
> & {
    /** It will always have a title - if empty, it's "Artwork" */
    title: string;
    /** No one fills descriptions so everything is lorem ipsum */
    description: string;
    price: number;
    currency: string;
    bestseller: boolean;
};

export type MinimalProduct = Pick<
    StoreProduct,
    "id" | "title" | "bestseller" | "image" | "price" | "width" | "height" | "main_color" | "tags"
>;

export interface PexelsPhoto {
    id: string;
    type: "photo" | "video";
    attributes: {
        id: number;
        slug: string;
        description: string | null;
        width: number;
        height: number;
        status: string;
        /** DateTime */
        created_at: string;
        /** DateTime */
        updated_at: string;
        /** DateTime */
        publish_at: string | null;
        /** DateTime */
        feed_at: string;
        title: string | null;
        aspect_ratio: number;
        license: string;
        published: boolean;
        starred: boolean;
        user: {
            id: number;
            /** Can be empty */
            first_name: string;
            /** Can be empty */
            last_name: string;
            slug: string;
            username: string | null;
            location: string | null;
            avatar: {
                /** URL */
                small: string;
                /** URL */
                medium: string;
            };
            hero: boolean;
            following: boolean;
        };
        tags: string[];
        liked: boolean;
        collection_ids: number[];
        /** URL */
        donate_url: string;
        main_color: [red: number, green: number, blue: number];

        image: {
            /** URL */
            download: string;
            /** URL */
            download_link: string;
            /** URL */
            small: string;
            /** URL */
            medium: string;
            /** URL */
            large: string;
        };
        alt: string;
        colors: [string, string, string];
    };
}

export interface JsonData<T> {
    products: T;
}

export enum StoreDataError {
    UnknownError = "unknown_error",
}

export function getStoreData() {
    const data: JsonData<StoreProduct[]> = JSON.parse(readFileSync(STORE_DATA_PATH, "utf-8"));
    return data;
}

export function getMinimalProduct(product: StoreProduct): MinimalProduct {
    const { id, title, price, bestseller, width, height, main_color, image, tags } = product;
    return {
        id,
        title,
        price,
        bestseller,
        width,
        height,
        main_color,
        image,
        tags,
    };
}
