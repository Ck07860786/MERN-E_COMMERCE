import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvide } from "./context/auth.jsx";
import { SearchProvide } from "./context/SerchContext.jsx";
import { CartProvide } from "./context/Cart.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvide>
    <SearchProvide>
    <CartProvide>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvide>
    </SearchProvide>
  </AuthProvide>
);
