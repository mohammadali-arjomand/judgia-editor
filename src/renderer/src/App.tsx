import { useRef, useState } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/theme-monokai"

function App(): React.JSX.Element {
  const [code, setCode] = useState<string>(
    "#include<bits/stdc++.h>\n\nusing namespace std;\n\nvoid solve() {\n\n\t// code here\n\n\treturn;\n}\n\nint main() {\n\tint t = 1;\n\t//cin >> t;\n\twhile (t--) solve();\n\treturn 0;\n}"
  )
  const aceRef = useRef<AceEditor>(null)

  function newFileAction(): void {
    return
  }

  function openFileAction(): void {
    const handleOpenFile = async (): Promise<void> => {
      const filePath = await window.api.openFile()
      if (!filePath) return
      const content = await window.api.readFile(filePath)
      aceRef.current?.editor.setValue(content || "", -1)
    }
    handleOpenFile()
  }

  function saveFileAction(): void {
    return
  }

  function saveAsFileAction(): void {
    return
  }

  return (
    <div className="container">
      <div className="tools-bar">
        <button onClick={newFileAction}>New</button>
        <button onClick={openFileAction}>Open</button>
        <button onClick={saveFileAction}>Save</button>
        <button onClick={saveAsFileAction}>Save as</button>
      </div>
      <div className="workspace">
        <div className="editor">
          <AceEditor
            ref={aceRef}
            mode="c_cpp"
            theme="monokai"
            value={code}
            onChange={setCode}
            width="100%"
            height="100%"
            focus
            fontSize={16}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4
            }}
          />
        </div>
        <div className="left-sidebar">
          <div className="sidebar-top">
            <textarea id="testcase-text" placeholder="Write the testcase here..."></textarea>
          </div>
          <div className="sidebar-bottom">
            <textarea
              id="output-text"
              disabled
              placeholder="Output will be shown here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
