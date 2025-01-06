import { BrowserRouter, Route, Routes } from "react-router";
import Builder from "./Pages/Builder";
import "./App.css";
import PageNotFound from "./Pages/PageNotFound";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
