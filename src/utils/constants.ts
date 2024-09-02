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

export const codeInText = `
import { Typography } from "antd";
import Table from "./components/Table";
import CodeMirrorEditor from "./components/CodeMirrorEditor";
import { useEffect, useState } from "react";
import { Table as AntTable, Select } from "antd";
import {
  currencies,
  DEFAULT_CURRENCY,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT,
  tableSortOptions,
  TOTAL_PAGE_COUNT,
} from "../utils/constants";
import { ColumnsType, DataType, TableParams } from "../utils/types";
import { currencySymbol } from "../utils";
import Indicator from "./Indicator";
import Sparkline from "./Sparkline";
import { Image } from "antd";

const { Title } = Typography;

function App() {

  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = new URLSearchParams(window.location.search);

  const [tableParams, setTableParams] = useState<TableParams>({
    vs_currency:
      searchParams.get("vs_currency")?.toUpperCase() || DEFAULT_CURRENCY,
    order: searchParams.get("order") || DEFAULT_SORT,
    per_page: Number(searchParams.get("per_page")) || DEFAULT_PER_PAGE,
    page: Number(searchParams.get("page")) || 1,
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <Image width={30} src={record.image} />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      width: "20%",
      render: (_, record) => (
        <span>
          {currencySymbol(tableParams.vs_currency, record.current_price)}
        </span>
      ),
    },
    {
      title: "24h",
      dataIndex: "market_cap_change_percentage_24h",
      render: (data) => <Indicator data={data} />,
      responsive: ["md"],
    },
    {
      title: "Circulating Supply",
      dataIndex: "circulating_supply",
    },
    {
      title: "Last 7 days",
      dataIndex: "sparkline_in_7d",
      render: (_, record) => (
        <Sparkline priceData={record.sparkline_in_7d.price} />
      ),
      responsive: ["md"],
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          import.meta.env.VITE_BASE_MARKET_URL?vs_currency=
            tableParams.vs_currency
          &order=tableParams.order&per_page=tableParams.per_page&page=
            tableParams.page
          &sparkline=true
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [tableParams]);

  // generic function to update query params with custom key and value type
  function updateSearchParam<T extends keyof TableParams>(
    value: string | number,
    key: T
  ) {
    searchParams.set(key as string, value.toString().toLocaleLowerCase());

    window.history.replaceState(null, "", ?searchParams.toString());

    setTableParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <>
      <main className="w-[90vw] mx-auto max-w-[1200px] py-10">
        <Title level={3}>Coins & Markets</Title>
        
        <div className="flex items-center gap-6 my-6">
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue={tableParams.vs_currency}
          placeholder="Select Currency"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={currencies}
          onChange={(value) => updateSearchParam(value, "vs_currency")}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue={tableParams.order}
          placeholder="Sort"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={tableSortOptions}
          onChange={(value) => updateSearchParam(value, "order")}
        />
      </div>
      <AntTable
        columns={columns}
        rowKey={(record) => record.name}
        dataSource={data}
        pagination={{
          current: tableParams.page,
          pageSize: tableParams.per_page,
          total: TOTAL_PAGE_COUNT,
          onChange: (page, pageSize) => {
            // detect whether is a page change or page size
            if (page !== tableParams.page) {
              updateSearchParam(page, "page");
            }
            if (pageSize !== tableParams.per_page) {
              updateSearchParam(pageSize, "per_page");
            }
          },
        }}
        loading={loading}
      />

        <Title level={3} className="!my-6">
          App source code
        </Title>
        <CodeMirrorEditor initialCode="console.log('Hello, CodeMirror!');" />
      </main>
    </>
  );
}

export default App;

`;
