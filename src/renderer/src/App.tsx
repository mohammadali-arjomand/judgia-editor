import { useEffect, useRef, useState } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/theme-monokai"

function App(): React.JSX.Element {
  const template =
    "#include<bits/stdc++.h>\n\nusing namespace std;\n\nvoid solve() {\n\n\t// code here\n\n\treturn;\n}\n\nint main() {\n\tint t = 1;\n\t//cin >> t;\n\twhile (t--) solve();\n\treturn 0;\n}"
  const [code, setCode] = useState<string>(template)
  const [testcase, setTestcase] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const aceRef = useRef<AceEditor>(null)

  useEffect(() => {
    if (localStorage.filePath !== undefined) {
      const handleOpenFile = async (): Promise<void> => {
        const filePath = localStorage.filePath
        if (!filePath) return
        const content = await window.api.readFile(filePath)
        localStorage.setItem("filePath", filePath)
        updateTitle(filePath)
        aceRef.current?.editor.setValue(content || "", -1)
      }
      handleOpenFile()
      localStorage.removeItem("hasChanged")
    } else {
      updateTitle("untitled.cpp")
    }
  }, [])

  function updateTitle(filePath: string): void {
    document.title = document.title.split(" ~ ")[0]
    document.title += ` ~ ${String(filePath).split("/").at(-1)}`
  }

  function newFileAction(): void {
    if (localStorage.hasChanged == "true") {
      saveFileAction()
    }
    localStorage.removeItem("filePath")
    document.title = document.title.split(" ~ ")[0]
    aceRef.current?.editor.setValue("")
  }

  function openFileAction(): void {
    const handleOpenFile = async (): Promise<void> => {
      const filePath = await window.api.openFile()
      if (!filePath) return
      const content = await window.api.readFile(filePath)
      localStorage.setItem("filePath", filePath)
      updateTitle(filePath)
      aceRef.current?.editor.setValue(content || "", -1)
    }
    handleOpenFile()
    localStorage.removeItem("hasChanged")
  }

  function saveFileAction(): void {
    if (localStorage.filePath !== undefined) {
      window.api.writeFile(localStorage.filePath, code)
      localStorage.removeItem("hasChanged")
      document.title = document.title.replaceAll("*", "")
    } else {
      saveAsFileAction()
    }
  }

  function saveAsFileAction(): void {
    const handleSaveFile = async (): Promise<void> => {
      const filePath = await window.api.saveFile()
      if (!filePath) return
      window.api.writeFile(filePath, code)
      localStorage.removeItem("hasChanged")
      localStorage.setItem("filePath", filePath)
      document.title += ` ~ ${String(filePath).split("/").at(-1)}`
      document.title = document.title.replaceAll("*", "")
    }
    handleSaveFile()
  }

  useEffect(() => {
    localStorage.hasChanged = "true"
    document.title = document.title.replaceAll("*", "") + "*"
  }, [code])

  function templateAction(): void {
    aceRef.current?.editor.setValue(template)
  }

  return (
    <div className="container">
      <div className="tools-bar">
        <button onClick={newFileAction}>New</button>
        <button onClick={openFileAction}>Open</button>
        <button onClick={saveFileAction}>Save</button>
        <button onClick={saveAsFileAction}>Save as</button>
        <button onClick={templateAction}>Template</button>
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
            <textarea
              value={testcase}
              onChange={(e) => setTestcase(e.target.value)}
              placeholder="Write the testcase here..."
            ></textarea>
          </div>
          <div className="sidebar-bottom">
            <textarea
              disabled
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Output will be shown here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
