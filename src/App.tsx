import "./App.css";
import { Posts } from "./Post";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCLient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <>
        <h1>Blog Posts</h1>
        <Posts />
      </>
    </QueryClientProvider>
  );
}

export default App;
