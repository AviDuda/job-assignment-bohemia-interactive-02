import { NextApiRequest } from "next";

import { queryEnforceArray, queryEnforceString } from "./utils";

export enum SortDirection {
    Ascending = "ascending",
    Descending = "descending",
}

export enum SortField {
    Default = "default",
    Price = "price",
    Title = "title",
}

export enum ProductLoadError {
    WrongStatus = "wrong_status",
    UnknownError = "unknown_error",
    InvalidSortDirection = "invalid_sort_direction",
    InvalidSortField = "invalid_sort_field",
    InvalidPageNumber = "invalid_page_number",
}

export type FilterQuery = {
    page: number;
    prices: string[];
    direction: SortDirection;
    field: SortField;
    tags: string[];
};

export const DEFAULT_QUERY_VALUES: { [name in keyof FilterQuery]: FilterQuery[name] } = {
    page: 1,
    prices: [],
    direction: SortDirection.Ascending,
    field: SortField.Default,
    tags: [],
};

export function parseApiQuery(query: NextApiRequest["query"]): FilterQuery {
    const directionStr = queryEnforceString(query.direction) ?? DEFAULT_QUERY_VALUES.direction;
    const direction = Object.values(SortDirection).includes(directionStr as SortDirection)
        ? (directionStr as SortDirection)
        : DEFAULT_QUERY_VALUES.direction;

    const fieldStr = queryEnforceString(query.field) ?? DEFAULT_QUERY_VALUES.field;
    const field = Object.values(SortField).includes(fieldStr as SortField)
        ? (fieldStr as SortField)
        : DEFAULT_QUERY_VALUES.field;

    return {
        page: Number(queryEnforceString(query.page) ?? DEFAULT_QUERY_VALUES["page"]),
        direction,
        field,
        tags: queryEnforceArray(query.tags) ?? [],
        prices: queryEnforceArray(query.prices) ?? [],
    };
}
