import { Typography } from "antd";
import Table from "./components/Table";
import CodeMirrorEditor from "./components/CodeMirrorEditor";
import { codeInText } from "./utils/constants";

const { Title } = Typography;

function App() {
  return (
    <>
      <main className="w-[90vw] mx-auto max-w-[1200px] py-10">
        <Title level={3}>Coins & Markets</Title>
        <Table />
        <Title level={3} className="!my-6">
          App source code
        </Title>
        <CodeMirrorEditor initialCode={codeInText} />
      </main>
    </>
  );
}

export default App;
