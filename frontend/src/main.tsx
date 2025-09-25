import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/root.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ModalProvider } from "./contexts/ModalContext.tsx";

const isLocal = window.location.hostname === "localhost";

const apiUri = isLocal
  ? "http://localhost:8000/api"  // local dev
  : "/api";                      // staging or prod

const client = new ApolloClient({
  // uri: "http://localhost:8000/api",
  //uri: "/api",
  uri: apiUri,
  cache: new InMemoryCache(),
  credentials: "include",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <StrictMode>
          <ModalProvider>
            <App />
          </ModalProvider>
        </StrictMode>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
