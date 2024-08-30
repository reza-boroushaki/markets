import { Currencies, TableSortOptions } from "./types";

export const TOTAL_PAGE_COUNT = 10000;

export const DEFAULT_CURRENCY = "USD";
export const DEFAULT_SORT = "market_cap_desc";
export const DEFAULT_PER_PAGE = 10;

export const currencies: Currencies[] = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
];

export const tableSortOptions: TableSortOptions[] = [
  {
    value: "market_cap_desc",
    label: "Market cap descending",
  },
  {
    value: "market_cap_asc",
    label: "Market cap ascending",
  },
];
