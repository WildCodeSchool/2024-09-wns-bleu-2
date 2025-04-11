import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/root.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";


const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8000/api",
    headers: {
      "x-apollo-operation-name": "safe-request",
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <StrictMode>
          <App />
        </StrictMode>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
