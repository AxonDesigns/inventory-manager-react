import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Vite + React</h1>
    </ThemeProvider>
  )
}

export default App
