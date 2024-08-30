import { Typography } from "antd";
import Table from "./components/Table";

const { Title } = Typography;

function App() {
  return (
    <>
      <main className="w-[90vw] mx-auto max-w-[1200px] py-10">
        <Title level={2}>Coins & Markets</Title>
        <Table />
      </main>
    </>
  );
}

export default App;
