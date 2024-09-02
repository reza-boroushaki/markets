import { useState } from "react";
import Controlled from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

interface CodeMirrorEditorProps {
  initialCode?: string;
}

const CodeMirrorEditor = ({ initialCode = "" }: CodeMirrorEditorProps) => {
  const [code, setCode] = useState<string>(initialCode);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <div>
      <Controlled
        value={code}
        extensions={[javascript()]}
        onChange={(value) => handleCodeChange(value)}
        theme="light"
      />
    </div>
  );
};

export default CodeMirrorEditor;
