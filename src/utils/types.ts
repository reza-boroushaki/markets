import type { GetProp, TableProps } from "antd";

export type ColumnsType<T extends object = object> = TableProps<T>["columns"];

export type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

export type DataType = {
  image: string;
  name: string;
  current_price: string;
  circulating_supply: string;
};

export interface TableParams {
  vs_currency: string;
  order: string;
  per_page: number;
  page: number;
  sparkline?: boolean;
}

export type Currencies = {
  value: string;
  label: string;
};

export type TableSortOptions = {
  value: string;
  label: string;
};
