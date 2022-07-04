import { readFileSync } from "node:fs";
import path from "node:path";

import type { NextApiRequest, NextApiResponse } from "next";

import { parseApiQuery, ProductLoadError, SortDirection, SortField } from "../../src/api";
import { ApiResponse, MinimalProduct, StoreProduct, SuccessApiResponse } from "../../src/apiTypes";
import { PRICE_FILTER, PRODUCTS_PER_PAGE } from "../../src/utils";

export interface JsonData<T> {
    products: T;
}

export const PEXELS_DATA_PATH = path.join(process.cwd(), "data/pexels_data.json");
export const STORE_DATA_PATH = path.join(process.cwd(), "data/store_data.json");

export function getMinimalProduct(product: StoreProduct): MinimalProduct {
    const { id, title, price, bestseller, width, height, main_color, image, tags, user } = product;
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
        user: {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
        },
    };
}

export function getStoreData() {
    const data: JsonData<StoreProduct[]> = JSON.parse(readFileSync(STORE_DATA_PATH, "utf-8"));
    return data;
}

export function getFilteredProducts(query: NextApiRequest["query"]): SuccessApiResponse {
    const { page, prices, direction, field, tags } = parseApiQuery(query);

    if (!Object.values(SortDirection).includes(direction as SortDirection)) {
        throw new Error(ProductLoadError.InvalidSortDirection);
    }

    if (!Object.values(SortField).includes(field as SortField)) {
        throw new Error(ProductLoadError.InvalidSortField);
    }

    if (!isFinite(page)) {
        throw new Error(ProductLoadError.InvalidPageNumber);
    }

    const storeData = getStoreData();

    // Yeah, doing it the easy way with chainable methods, I know it's not the most efficient but it's more readable

    let products = storeData.products
        .filter((product) => {
            return tags.length > 0 ? product.tags.some((productTag) => tags.includes(productTag)) : true;
        })
        .filter((product) => {
            return prices.length > 0 ? prices.some((price) => PRICE_FILTER[price]?.check(product.price) ?? true) : true;
        })
        .map((product) => getMinimalProduct(product));

    products = products.sort((a, b) => {
        const sortKey = field as SortField;
        let result: number;
        switch (sortKey) {
            case SortField.Price: {
                if (a[sortKey] === b[sortKey]) {
                    result = 0;
                } else {
                    result = a[sortKey] > b[sortKey] ? 1 : -1;
                }
                break;
            }
            case SortField.Title: {
                if (a[sortKey] === b[sortKey]) {
                    result = 0;
                } else {
                    result = a[sortKey].localeCompare(b[sortKey]);
                }
                break;
            }
            default: {
                result = 0;
            }
        }
        if (direction === SortDirection.Ascending) {
            return result;
        } else {
            return sortKey === SortField.Default ? -1 : -1 * result;
        }
    });

    const total = products.length;

    products = products.slice(page * PRODUCTS_PER_PAGE - PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

    return { success: true, total, products };
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end();
    }

    try {
        const apiResponse = getFilteredProducts(req.query);
        return res.status(200).json(apiResponse);
    } catch (err) {
        return res
            .status(422)
            .json({ success: false, error: typeof err === "string" ? err : ProductLoadError.UnknownError });
    }
}
