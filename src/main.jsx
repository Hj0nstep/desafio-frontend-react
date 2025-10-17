import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/global.css"; //mudança de aspas antes 1 agora 2
import "./css/home.css";   //mudança de aspas antes 1 agora 2
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
