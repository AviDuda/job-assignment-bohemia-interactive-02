import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";

import { getMinimalProduct, getStoreData, MinimalProduct, StoreDataError, StoreProduct } from "../src/api";
import ErrorMessage from "../src/components/ErrorMessage";
import FeaturedProduct from "../src/components/FeaturedProduct";
import Filters from "../src/components/Filters";
import LoadingIndicator from "../src/components/LoadingIndicator";
import PageWrapper from "../src/components/PageWrapper";
import Pagination from "../src/components/Pagination";
import ProductCard from "../src/components/ProductCard";
import { getRandom } from "../src/utils";

const PRODUCTS_PER_PAGE = 9;

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
    };
    initialError?: StoreDataError | null;
}

function humanizeError(error: Error): string {
    console.warn(error);
    return error.message;
    // TODO
    //     if (error.name === "AbortError") {
    //         return "Slow API server response, check your internet connection.";
    //     }

    //     switch (error.message as ProductLoadError) {
    //         case ProductLoadError.WrongStatus: {
    //             return "Received wrong status while fetching product data.";
    //         }
    //         case ProductLoadError.InvalidData: {
    //             return "Product response returned invalid data.";
    //         }
    //         default: {
    //             return "Unknown error while fetching product data.";
    //         }
    //     }
}

export const getStaticProps: GetStaticProps<HomepageProps> = async (_context) => {
    try {
        const { products: allProducts } = getStoreData();

        const initialProducts: MinimalProduct[] = allProducts
            .slice(0, PRODUCTS_PER_PAGE)
            .map((product) => getMinimalProduct(product));

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

        // Pick the first tag because there are too many anyway
        const tags = new Set<string>(allProducts.flatMap((p) => p.tags[0]).filter((p) => p !== undefined));

        return {
            props: {
                initialData: {
                    products: initialProducts,
                    count: allProducts.length,
                    featured,
                    peopleAlsoBuy: [...peopleAlsoBuy.values()],
                    tags: [...tags.values()],
                },
            },
        };
    } catch (err) {
        console.error("Failed to load store data.", err);
        const error = typeof err === "string" ? (err as StoreDataError) : StoreDataError.UnknownError;

        return {
            props: {
                initialError: error,
            },
        };
    }
};

const Homepage: NextPage = ({ initialData, initialError = null }: HomepageProps) => {
    const [error, _setError] = useState<string | null>(
        initialError === null ? null : humanizeError(new Error(initialError)),
    );
    const [isLoading, _setIsLoading] = useState<boolean>(initialData?.products.length === 0);

    return (
        <>
            <PageWrapper title="Products">
                {isLoading && (
                    <>
                        <div className="flex h-full grow place-content-center place-items-center py-8">
                            <LoadingIndicator size="69px" />
                        </div>
                    </>
                )}
                {!isLoading && error && <ErrorMessage message={error} />}
                {!isLoading && initialData && (
                    <>
                        <FeaturedProduct featured={initialData.featured} peopleAlsoBuy={initialData.peopleAlsoBuy} />
                        <Filters tags={initialData.tags} filters={{}}>
                            <>
                                <section className="grid place-content-center gap-12 sm:grid-cols-2 xl:grid-cols-3">
                                    {initialData.products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </section>
                            </>
                        </Filters>
                        {initialData.products.length < initialData.count && (
                            <Pagination
                                total={Math.ceil(initialData.count / initialData.products.length)}
                                current={1}
                            />
                        )}
                    </>
                )}
            </PageWrapper>
        </>
    );
};

export default Homepage;
