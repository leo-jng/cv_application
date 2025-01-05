import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
