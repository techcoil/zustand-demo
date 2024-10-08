import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const data = {
  formId: 123,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App {...data} />
  </StrictMode>
);
