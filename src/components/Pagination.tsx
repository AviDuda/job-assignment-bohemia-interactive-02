interface PaginationProps {
    current: number;
    total: number;
}

export default function Pagination({ current, total }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-4">
            {current > 1 && (
                <a href={`?page=${current - 1}`} aria-label="Go to previous page">
                    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 2L3 10L11 18" stroke="black" strokeWidth="3" />
                    </svg>
                </a>
            )}
            {[...Array(total).keys()].map((page) => (
                <a
                    href={`?page=${page + 1}`}
                    className={`text-3xl hover:font-semibold hover:text-current ${
                        current === page + 1 ? "font-semibold" : "text-gray-400"
                    }`}
                    key={page + 1}
                >
                    {page + 1}
                </a>
            ))}
            {current < total && (
                <a href={`?page=${current + 1}`} aria-label="Go to next page">
                    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L10 10L2 18" stroke="black" strokeWidth="3" />
                    </svg>
                </a>
            )}
        </div>
    );
}
