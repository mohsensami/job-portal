import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./fonts.js"; // Import fonts

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
