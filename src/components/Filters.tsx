import clsx from "clsx";
import { MouseEvent, ReactNode, useEffect, useRef } from "react";

import { StoreProduct } from "../api";
import { ModalContext } from "../context/ModalContext";
import { useWindowSize } from "../hooks/useWindowSize";
import { PRICE_FILTER } from "../utils";

import Checkbox from "./Checkbox";
import SvgCloseIcon from "./svg/SvgCloseIcon";
import SvgFilterIcon from "./svg/SvgFilterIcon";
import SvgSortIcon from "./svg/SvgSortIcon";

interface ProductListProps {
    tags: StoreProduct["tags"];
    filters: Record<string, unknown>; // TODO
    children: ReactNode;
}

export default function Filters({ tags, filters: _filters, children }: ProductListProps) {
    const { currentModal, showModal, closeModal } = ModalContext.useContainer();
    const { innerWidth, setShouldTrackResize } = useWindowSize(false);

    const filtersRef = useRef<HTMLDivElement | null>(null);
    const filtersParentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
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

    return (
        <section className="py-16">
            <div className="flex items-center justify-between gap-8">
                <div>
                    <span className="text-3xl font-bold">Photography</span>
                    <span className="pl-4 pr-[0.6rem] text-4xl font-semibold">/ </span>
                    <span className="text-3xl text-gray-400">Premium Photos</span>
                </div>
                <a href="#" className="lg:hidden" aria-label="Show filters" onClick={(e) => handleModalChange(e, true)}>
                    <SvgFilterIcon />
                </a>
                <div className="hidden items-center lg:flex">
                    <SvgSortIcon />
                    <span className="pl-2 pr-4 text-xl text-gray-400">Sort By</span>
                    <select
                        name="price"
                        className="border-0 bg-[length:2rem_2rem] bg-[right_0_top_75%] text-xl text-black focus:ring-black"
                    >
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
                            "fixed top-[10%] left-0 z-20 mb-24 !flex h-full w-full max-w-5xl overscroll-contain bg-white px-10 pt-5",
                    )}
                >
                    <div className="static bg-white">
                        <div className="flex items-center justify-between pb-10 lg:hidden">
                            <h3 className="text-4xl font-bold">Filters</h3>
                            <a href="#" onClick={(e) => handleModalChange(e, false)}>
                                <SvgCloseIcon />
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 overflow-scroll">
                        <h4 className="hidden pb-11 text-xl font-bold lg:block">Category</h4>
                        {tags.map((tag) => (
                            <Checkbox
                                key={tag}
                                label={tag}
                                labelClassName="capitalize"
                                onChange={(e) => console.log(tag, e.target.checked)}
                            />
                        ))}
                        <hr className="h-0.5 w-3/5 bg-gray-300 lg:hidden" />
                        <h4 className="pt-8 pb-11 text-4xl font-bold lg:mt-0 lg:text-xl">Price range</h4>
                        {PRICE_FILTER.map((priceFilter) => (
                            <Checkbox
                                key={priceFilter.value}
                                label={priceFilter.name}
                                onChange={(e) =>
                                    console.log(`Price filter ${priceFilter.value} changed`, e.target.checked)
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
