import { ElectronAPI } from "@electron-toolkit/preload"

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openFile: () => Promise<string | null>
      saveFile: () => Promise<string | null>
      readFile: (filePath: string) => Promise<string | null>
      writeFile: (filePath: string, content: string) => Promise<void>
      execute: (
        filePath: string,
        testcase: string
      ) => Promise<{
        stderr: string
        stdout: string
      }>
    }
  }
}
