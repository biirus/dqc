import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <main className="flex flex-col items-center justify-center p-4 overflow-hidden gap-4 w-[100vw] h-[100vh] bg-gradient-to-br from-blue-100 to-pink-100">
      <App />
    </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
