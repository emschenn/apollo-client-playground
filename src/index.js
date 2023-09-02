import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { Theme } from "@radix-ui/themes";

import App from "./App";

const GRAPHQL_ENDPOINT = "https://wbkmwoblhfcldoxfkcas.supabase.co/graphql/v1";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India213b2JsaGZjbGRveGZrY2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNjY5MzcsImV4cCI6MjAwNzg0MjkzN30.KMjrHjA8B5ssK5fdtbFp-KED3RL_xhAfffqiiYPou9U";

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    apikey: ANON_KEY,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Theme appearance="light" accentColor="amber" grayColor="olive">
        <App />
      </Theme>
    </ApolloProvider>
  </StrictMode>
);
