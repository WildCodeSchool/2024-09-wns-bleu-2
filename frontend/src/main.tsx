import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/root.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";


const client = new ApolloClient({
  uri: "http://localhost:8000/api",
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
