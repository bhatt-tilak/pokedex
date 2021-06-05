import React from "react";

//react query setup
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/home/Home";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
