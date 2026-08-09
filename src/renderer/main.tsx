import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppProvider } from "./state/appStore";
import { DiagnosticLogWindow } from "./components/common/DiagnosticLogWindow";
import { UiLocalization } from "./i18n/UiLocalization";
import "flag-icons/css/flag-icons.min.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <UiLocalization />
      <App />
      <DiagnosticLogWindow />
    </AppProvider>
  </StrictMode>
);
