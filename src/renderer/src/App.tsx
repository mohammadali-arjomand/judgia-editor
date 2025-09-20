import { useState } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/theme-monokai"

function App(): React.JSX.Element {
  const [code, setCode] = useState<string>(
    "#include<bits/stdc++.h>\n\nusing namespace std;\n\nvoid solve() {\n\n\t// code here\n\n\treturn;\n}\n\nint main() {\n\tint t = 1;\n\t//cin >> t;\n\twhile (t--) solve();\n\treturn 0;\n}"
  )
  return (
    <div className="container">
      <div className="tools-bar">Tools</div>
      <div className="workspace">
        <div className="editor">
          <AceEditor
            mode="c_cpp"
            theme="monokai"
            value={code}
            onChange={setCode}
            width="100%"
            height="100%"
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 4
            }}
          />
        </div>
        <div className="left-sidebar">
          <div className="sidebar-top">
            <textarea id="testcase-text"></textarea>
          </div>
          <div className="sidebar-bottom">
            <textarea id="output-text" disabled></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
