import { contextBridge, ipcRenderer } from "electron"
import { electronAPI } from "@electron-toolkit/preload"
import { writeFile, readFile } from "fs/promises"

// Custom APIs for renderer
const api = {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  saveFile: async () => ipcRenderer.invoke("dialog:saveFile"),
  readFile: async (filePath: string) => readFile(filePath, "utf-8"),
  writeFile: async (filePath: string, content: string) => writeFile(filePath, content, "utf-8"),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI)
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
