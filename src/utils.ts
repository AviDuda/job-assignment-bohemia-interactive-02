export const PRODUCTS_PER_PAGE = 9;

export const PRICE_FILTER: { [priceFilter: string]: { name: string; check: (price: number) => boolean } } = {
    bargain: {
        name: "Less than $20",
        // value: "less_than_twenty",
        check: (price) => price < 20,
    },
    normal: {
        name: "$20 - $100",
        // value: "twenty_to_two_hundred",
        check: (price) => price >= 20 && price < 100,
    },
    iliveinsf: {
        name: "$100 - $200",
        // value: "hundred_to_two_hundred",
        check: (price) => price >= 100 && price < 200,
    },
    jeffbezos: {
        name: "More than $200",
        check: (price) => price >= 200,
    },
};

export function getRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/** Enforce string for a query param of {@link NextApiRequest.query} */
export function queryEnforceString(query?: string | string[]) {
    return Array.isArray(query) ? query[0] : query;
}

/**
 * Enforce array for a query param of {@link NextApiRequest.query}
 * Changes commas from URLSearchParams to an array of values
 */
export function queryEnforceArray(query?: string | string[]) {
    if (typeof query === "undefined") return [];
    return Array.isArray(query) ? query : query.split(",");
}

export async function apiRequest<TSuccess>(url: string, abortController = new AbortController()) {
    setTimeout(() => abortController.abort(), 5000);
    const response = await fetch(url, { signal: abortController.signal });
    if (!response.ok) {
        throw new Error("wrong_status");
    }
    const data = await response.json();
    if (data.success !== true) {
        throw new Error(data.error ?? "unknown_error");
    }
    return data as TSuccess;
}
