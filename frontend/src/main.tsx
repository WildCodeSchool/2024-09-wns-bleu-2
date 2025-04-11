import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/root.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
=======
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
>>>>>>> f48d8a7cca39e2d043fd246c921167bf65d79a0a

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
