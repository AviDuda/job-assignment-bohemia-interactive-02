import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useRef } from "react";
import { Virtuoso } from "react-virtuoso";

import { FilterQuery, parseApiQuery, SortDirection, SortField } from "../api";
import { StoreProduct } from "../apiTypes";
import { ModalContext } from "../context/ModalContext";
import { useWindowSize } from "../hooks/useWindowSize";
import { PRICE_FILTER } from "../utils";

import Checkbox from "./Checkbox";
import SvgCloseIcon from "./svg/SvgCloseIcon";
import SvgFilterIcon from "./svg/SvgFilterIcon";
import SvgSortIcon from "./svg/SvgSortIcon";

export interface ProductListProps {
    tags: StoreProduct["tags"];
    filters: FilterQuery;
    children: ReactNode;
}

export default function Filters({ tags, filters, children }: ProductListProps) {
    const router = useRouter();
    const { currentModal, showModal, closeModal } = ModalContext.useContainer();
    const { innerWidth, setShouldTrackResize } = useWindowSize(false);

    const filtersRef = useRef<HTMLDivElement | null>(null);
    const filtersParentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Checks if the filter modal should be closed when resizing the window

        if (!filtersRef.current) return;
        setShouldTrackResize(currentModal === "filters");
        if (currentModal !== "filters") return;
        if (typeof innerWidth === "undefined") return;
        if (innerWidth > filtersRef.current.clientWidth) {
            closeModal();
        }
    }, [closeModal, currentModal, innerWidth, setShouldTrackResize]);

    useEffect(() => {
        // Focus on opening the modal
        if (currentModal === "filters") {
            filtersRef.current?.focus();
        }
    }, [currentModal]);

    function handleModalChange(e: MouseEvent, show: boolean) {
        e.preventDefault();
        show ? showModal("filters", true) : closeModal();
    }

    function handleSortFieldChange(e: ChangeEvent<HTMLSelectElement>) {
        const newQuery = { ...router.query };
        delete newQuery.page;
        e.target.value === "default" ? delete newQuery.field : (newQuery.field = e.target.value);
        router.push({ query: newQuery }, undefined, {
            scroll: false,
            shallow: true,
        });
    }

    /** Sets query params for multiple choice checkboxes */
    function handleCheckboxChange({ field, value, checked }: { field: string; value: string; checked: boolean }) {
        const query = new URLSearchParams(router.query as Record<string, string>);
        let allValues = (query.get(field) ?? "").split(",");
        if (checked) {
            allValues.push(value);
        } else {
            allValues = allValues.filter((queryVal) => queryVal !== value);
        }
        allValues = allValues.filter((val) => val !== "").sort((a, b) => a.localeCompare(b));
        const joinedValues = allValues.join(",");
        joinedValues === "" ? query.delete(field) : query.set(field, joinedValues);
        query.delete("page");
        router.push({ query: query.toString() }, undefined, { scroll: false, shallow: true });
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="flex-1">
                    <span className="text-3xl font-bold">Photography</span>
                    <span className="pl-4 pr-[0.6rem] text-4xl font-semibold">/ </span>
                    <span className="text-3xl text-light-500/80 dark:text-dark-400">Premium Photos</span>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center">
                        <Link
                            href={{
                                query: {
                                    ...router.query,
                                    direction:
                                        filters.direction === SortDirection.Ascending
                                            ? SortDirection.Descending
                                            : SortDirection.Ascending,
                                },
                            }}
                            scroll={false}
                            shallow={true}
                        >
                            <a title="Change sorting direction" aria-label="Change sorting direction" className="p-2">
                                <SvgSortIcon activeDirection={parseApiQuery(router.query).direction} />
                            </a>
                        </Link>
                        <span id="sort-by" className="pr-4 text-xl text-light-500 dark:text-dark-400">
                            Sort By
                        </span>
                        <select
                            name="field"
                            aria-labelledby="sort-by"
                            className="border-0 bg-[length:2rem_2rem] bg-[right_0_top_75%] text-xl text-black focus:ring-black dark:bg-dark-500"
                            value={filters.field ?? SortField.Default}
                            onChange={handleSortFieldChange}
                        >
                            <option value="default">Default</option>
                            <option value="price">Price</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                    <a
                        href="#"
                        className="lg:hidden"
                        title="Show filters"
                        aria-label="Show filters"
                        onClick={(e) => handleModalChange(e, true)}
                    >
                        <SvgFilterIcon />
                    </a>
                </div>
            </div>
            <div className="flex pt-14" ref={filtersParentRef}>
                <div
                    ref={filtersRef}
                    tabIndex={currentModal === "filters" ? 0 : undefined}
                    className={clsx(
                        "hidden shrink-0 flex-col pr-8 lg:flex lg:w-1/3 2xl:w-1/5",
                        currentModal === "filters" &&
                            "fixed top-24 left-0 z-modal !flex h-[calc(100%-6rem)] w-full max-w-5xl overflow-auto overscroll-contain bg-white px-10 py-5 dark:bg-dark-900",
                    )}
                >
                    <h2 className="sr-only" id="dialog-label-filters">
                        Filters
                    </h2>
                    <div className="sticky flex items-center justify-between pb-10 lg:hidden">
                        <h3 className="text-4xl font-bold">Filters</h3>
                        <a
                            href="#"
                            onClick={(e) => handleModalChange(e, false)}
                            title="Close filters"
                            aria-label="Close filters"
                        >
                            <SvgCloseIcon />
                        </a>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h4 className="hidden pb-11 text-xl font-bold lg:block">Category</h4>
                        <div className="h-[40vh] min-h-[20rem] w-[80%] flex-shrink-0 lg:h-[70vh] lg:w-full">
                            <Virtuoso
                                totalCount={tags.length}
                                overscan={68 * 5}
                                className="overscroll-contain scrollbar-thin scrollbar-track-light-200 scrollbar-thumb-light-400 dark:scrollbar-thumb-dark-700 dark:scrollbar-track-dark-900"
                                itemContent={(index) => {
                                    const tag = tags[index];
                                    return (
                                        <Checkbox
                                            label={tag}
                                            labelClassName="capitalize"
                                            checked={filters.tags.includes(tag)}
                                            onChange={(e) =>
                                                handleCheckboxChange({
                                                    field: "tags",
                                                    value: tag,
                                                    checked: e.target.checked,
                                                })
                                            }
                                        />
                                    );
                                }}
                            />
                        </div>
                        <hr className="mt-10 h-0.5 w-3/5 border-light-300 dark:border-dark-600 lg:hidden" />
                        <h4 className="pt-8 pb-11 text-4xl font-bold lg:mt-0 lg:text-xl">Price range</h4>
                        <div>
                            {Object.entries(PRICE_FILTER).map(([priceValue, priceFilter]) => (
                                <Checkbox
                                    key={priceValue}
                                    label={priceFilter.name}
                                    checked={filters.prices.includes(priceValue)}
                                    onChange={(e) =>
                                        handleCheckboxChange({
                                            field: "prices",
                                            value: priceValue,
                                            checked: e.target.checked,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
}
