import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { store } from "@/store"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme" disableTransitionOnChange>
        <TooltipProvider delayDuration={0}>
          <App />
          <Toaster position="top-right" richColors />
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
