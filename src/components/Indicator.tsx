import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const Indicator = ({ data }: { data: number }) => {
  return (
    <div
      className={`${
        data < 0 ? "indicatorRed" : "indicatorGreen"
      } flex items-center gap-1`}
    >
      {data < 0 ? (
        <CaretDownOutlined color="indicatorRed" />
      ) : (
        <CaretUpOutlined color="indicatorGreen" />
      )}
      <span>{data.toFixed(1)}%</span>
    </div>
  );
};

export default Indicator;
