// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'

function App(): React.JSX.Element {
  return (
    <div className="container">
      <div className="tools-bar">Tools</div>
      <div className="workspace">
        <div className="editor">Monaco Editor</div>
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
