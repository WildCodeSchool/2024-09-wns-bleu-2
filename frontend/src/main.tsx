import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/root.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api", // Ensure this is correct
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
<ApolloProvider client={client}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ApolloProvider>
);
