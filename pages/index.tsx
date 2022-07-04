import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { DEFAULT_QUERY_VALUES, parseApiQuery, ProductLoadError, FilterQuery } from "../src/api";
import { StoreProduct, MinimalProduct, ApiResponse } from "../src/apiTypes";
import ErrorMessage from "../src/components/ErrorMessage";
import FeaturedProduct from "../src/components/FeaturedProduct";
import Filters from "../src/components/Filters";
import LoadingIndicator from "../src/components/LoadingIndicator";
import PageWrapper from "../src/components/PageWrapper";
import Pagination from "../src/components/Pagination";
import ProductCard from "../src/components/ProductCard";
import { useComponentDidMount } from "../src/hooks/useComponentDidMount";
import { apiRequest, getRandom, PRODUCTS_PER_PAGE } from "../src/utils";

import { getFilteredProducts, getMinimalProduct, getStoreData } from "./api/products";

export type PeopleAlsoBuy = Pick<StoreProduct, "id" | "title" | "slug" | "main_color"> & {
    image: StoreProduct["image"]["small"];
};

interface HomepageProps {
    initialData?: {
        products: MinimalProduct[];
        count: number;
        featured: MinimalProduct & Pick<StoreProduct, "description">;
        peopleAlsoBuy: PeopleAlsoBuy[];
        tags: StoreProduct["tags"];
        filters: FilterQuery;
    };
    initialError?: ProductLoadError | null;
}

function humanizeError(error: Error): string {
    console.warn(error);

    switch (error.message as ProductLoadError) {
        case ProductLoadError.UnknownError: {
            return "Unknown error while fetching product data.";
        }
        case ProductLoadError.WrongStatus: {
            return "Received wrong status while fetching product data.";
        }
        case ProductLoadError.InvalidSortDirection: {
            return "Invalid sort direction!";
        }
        case ProductLoadError.InvalidSortField: {
            return "Invalid sort type!";
        }
        case ProductLoadError.InvalidPageNumber: {
            return "Invalid page number!";
        }
        default: {
            return "Unexpected error while fetching product data.";
        }
    }
}

/*
 * I sadly can't use both getStaticProps and getServerSideProps at once.
 *
 * getStaticProps would be useful for build-time generated HTML (without any query params),
 * for featured products and for tag list
 *
 * getServerSideProps would be the place for pre-rendering data for filtered results from query params
 *
 * @see https://github.com/vercel/next.js/discussions/11424
 */

export const getServerSideProps: GetServerSideProps<HomepageProps> = async ({ query }) => {
    try {
        const { products: allProducts } = getStoreData();

        const { products: filteredProducts, total: filteredProductsTotal } = getFilteredProducts(query);

        const featuredProduct = getRandom(allProducts);
        const featured = {
            ...getMinimalProduct(featuredProduct),
            description: featuredProduct.description,
        };

        const peopleAlsoBuy = new Map<StoreProduct["id"], PeopleAlsoBuy>();

        while (peopleAlsoBuy.size < 3) {
            const product = getRandom(allProducts);
            if (product.id === featured.id) {
                continue;
            }
            peopleAlsoBuy.set(product.id, {
                id: product.id,
                title: product.title,
                slug: product.slug,
                image: product.image.small,
                main_color: product.main_color,
            });
        }

        const tags = new Set<string>(allProducts.flatMap((p) => p.tags).filter((p) => p !== undefined));

        return {
            props: {
                initialData: {
                    products: filteredProducts,
                    count: filteredProductsTotal,
                    featured,
                    peopleAlsoBuy: [...peopleAlsoBuy.values()],
                    tags: [...tags.values()].sort((a, b) => a.localeCompare(b)),
                    filters: parseApiQuery(query),
                },
            },
        };
    } catch (err) {
        console.error("Failed to load store data.", err);
        const error = typeof err === "string" ? (err as ProductLoadError) : ProductLoadError.UnknownError;

        return {
            props: {
                initialError: error,
            },
        };
    }
};

const Homepage: NextPage = ({ initialData, initialError = null }: HomepageProps) => {
    const { query, isReady } = useRouter();
    const isComponentMounted = useComponentDidMount();

    const [products, setProducts] = useState(initialData?.products);
    const [totalProductCount, setTotalProductCount] = useState(initialData?.count ?? 0);
    const [error, setError] = useState<string | null>(
        initialError === null ? null : humanizeError(new Error(initialError)),
    );
    const [isLoading, setIsLoading] = useState<boolean>(initialData?.products.length === 0);
    const [filters, setFilters] = useState<FilterQuery>(initialData?.filters ?? DEFAULT_QUERY_VALUES);

    const productListRef = useRef<HTMLDivElement | null>(null);
    const currentAbortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Store filters and fetch data from API on query param change

        // Skip the first render as we have data from the server
        if (!isComponentMounted && initialError === null) return;

        // Do nothing if the router isn't ready
        if (!isReady) return;

        // Cancel any possible outgoing API request
        currentAbortControllerRef.current && currentAbortControllerRef.current.abort();

        // Store filters and current page
        setFilters((prevFilters) => {
            const newFilters = parseApiQuery(query);
            if (newFilters.page !== prevFilters.page) {
                productListRef.current?.scrollIntoView();
            }

            return newFilters;
        });

        // Fetch data from the API
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const searchParams = new URLSearchParams(query as Record<string, string>).toString();
                currentAbortControllerRef.current = new AbortController();
                const data = await apiRequest<ApiResponse>(
                    `/api/products?${searchParams}`,
                    currentAbortControllerRef.current,
                );
                if (!data.success) {
                    throw new Error(data.error);
                }
                setProducts(data.products);
                setTotalProductCount(data.total);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return;
                }
                const error = typeof err === "string" ? new Error(err) : (err as Error);
                setError(humanizeError(error));
            } finally {
                setIsLoading(false);
            }
        })();
    }, [initialError, isComponentMounted, isReady, query]);

    return (
        <>
            <PageWrapper title="Products">
                {!isLoading && !initialData && error && <ErrorMessage message={error} />}
                {initialData && (
                    <>
                        <FeaturedProduct featured={initialData.featured} peopleAlsoBuy={initialData.peopleAlsoBuy} />
                        <div ref={productListRef}>
                            <Filters tags={initialData.tags} filters={filters}>
                                <div className="flex-grow">
                                    {isLoading && (
                                        <>
                                            <div className="flex w-full justify-center py-16 lg:py-32">
                                                <LoadingIndicator size="69px" />
                                            </div>
                                        </>
                                    )}
                                    {!isLoading && (
                                        <>
                                            {error && (
                                                <div className="flex w-full justify-center py-16 lg:py-32">
                                                    <ErrorMessage message={error} />
                                                </div>
                                            )}
                                            {!error && products && (
                                                <div className="flex flex-col gap-16">
                                                    <section className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3">
                                                        {products.map((product) => (
                                                            <ProductCard key={product.id} product={product} />
                                                        ))}
                                                    </section>
                                                    {products.length < totalProductCount && (
                                                        <Pagination
                                                            totalPages={
                                                                products.length % PRODUCTS_PER_PAGE > 0
                                                                    ? filters.page
                                                                    : Math.ceil(totalProductCount / products.length)
                                                            }
                                                            currentPage={filters.page}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Filters>
                        </div>
                    </>
                )}
            </PageWrapper>
        </>
    );
};

export default Homepage;
