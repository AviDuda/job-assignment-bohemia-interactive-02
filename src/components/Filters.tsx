import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useRef } from "react";

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
        allValues = allValues.filter((val) => val !== "");
        const joinedValues = allValues.join(",");
        joinedValues === "" ? query.delete(field) : query.set(field, joinedValues);
        query.delete("page");
        router.push({ query: query.toString() }, undefined, { scroll: false, shallow: true });
    }

    return (
        <section className="py-16">
            <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="flex-1">
                    <span className="text-3xl font-bold">Photography</span>
                    <span className="pl-4 pr-[0.6rem] text-4xl font-semibold">/ </span>
                    <span className="text-3xl text-gray-400 dark:text-zinc-400">Premium Photos</span>
                </div>
                <a href="#" className="lg:hidden" aria-label="Show filters" onClick={(e) => handleModalChange(e, true)}>
                    <SvgFilterIcon />
                </a>
                <div className="hidden items-center lg:flex">
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
                        <a title="Change sorting direction" className="p-2">
                            <SvgSortIcon activeDirection={parseApiQuery(router.query).direction} />
                        </a>
                    </Link>
                    <span className="pr-4 text-xl text-gray-400 dark:text-zinc-400">Sort By</span>
                    <select
                        name="field"
                        className="border-0 bg-[length:2rem_2rem] bg-[right_0_top_75%] text-xl text-black focus:ring-black dark:bg-zinc-500"
                        value={filters.field ?? SortField.Default}
                        onChange={handleSortFieldChange}
                    >
                        <option value="default">Default</option>
                        <option value="price">Price</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
            <div className="flex pt-14" ref={filtersParentRef}>
                <div
                    ref={filtersRef}
                    className={clsx(
                        "hidden shrink-0 flex-col pr-8 lg:flex",
                        currentModal === "filters" &&
                            "fixed top-24 left-0 z-modal mb-24 !flex h-full w-full max-w-5xl overscroll-contain bg-white px-10 pt-5 dark:bg-zinc-900",
                    )}
                >
                    <div className="static">
                        <div className="flex items-center justify-between pb-10 lg:hidden">
                            <h3 className="text-4xl font-bold">Filters</h3>
                            <a href="#" onClick={(e) => handleModalChange(e, false)}>
                                <SvgCloseIcon />
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-900">
                        <h4 className="hidden pb-11 text-xl font-bold lg:block">Category</h4>
                        <div className="max-h-[60vh] overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-900 lg:max-h-[80vh]">
                            {tags.map((tag) => (
                                <Checkbox
                                    key={tag}
                                    label={tag}
                                    labelClassName="capitalize"
                                    checked={filters.tags.includes(tag)}
                                    onChange={(e) =>
                                        handleCheckboxChange({ field: "tags", value: tag, checked: e.target.checked })
                                    }
                                />
                            ))}
                        </div>
                        <hr className="mt-10 h-0.5 w-3/5 border-gray-300 dark:border-zinc-600 lg:hidden" />
                        <h4 className="pt-8 pb-11 text-4xl font-bold lg:mt-0 lg:text-xl">Price range</h4>
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
                {children}
            </div>
        </section>
    );
}
