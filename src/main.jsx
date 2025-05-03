import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <Provider store={store}>
      {/* <-- Added here */}
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </StrictMode>
);
