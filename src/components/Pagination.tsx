import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const { query } = useRouter();

    const newQuery = { ...query };
    delete newQuery.page;

    return (
        <div className="flex items-center justify-center gap-4">
            {currentPage > 1 && (
                <Link
                    href={currentPage - 1 > 1 ? { query: { ...newQuery, page: currentPage - 1 } } : { query: newQuery }}
                    scroll={false}
                    shallow={true}
                >
                    <a aria-label="Go to previous page">
                        <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 2L3 10L11 18" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </a>
                </Link>
            )}
            {[...Array(totalPages).keys()].map((page) => {
                const thisPage = page + 1;
                const query = thisPage === 1 ? newQuery : { ...newQuery, page: thisPage };
                return (
                    <Link href={{ query }} scroll={false} shallow={true} key={thisPage}>
                        <a
                            aria-label={`Go to page ${thisPage}`}
                            className={clsx(
                                "text-3xl hover:font-semibold hover:text-current",
                                currentPage === thisPage
                                    ? "font-semibold dark:text-zinc-300"
                                    : "text-gray-400 dark:text-zinc-500",
                            )}
                        >
                            {page + 1}
                        </a>
                    </Link>
                );
            })}
            {currentPage < totalPages && (
                <Link href={{ query: { ...newQuery, page: currentPage + 1 } }} scroll={false} shallow={true}>
                    <a aria-label="Go to next page">
                        <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </a>
                </Link>
            )}
        </div>
    );
}
