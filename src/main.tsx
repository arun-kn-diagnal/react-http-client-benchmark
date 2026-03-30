// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import { ApiProvider } from '@reduxjs/toolkit/query/react'
// import { Provider } from 'react-redux'
import React from "react";
// import { benchmarkStore } from './Services/rtkqService.tsx'
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { rtkApi } from "./Services/rtkqService.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={rtkApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
);
