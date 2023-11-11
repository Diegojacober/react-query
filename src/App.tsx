import "./App.css";
import { Posts } from "./Post";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCLient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <>
        <h1>Blog Posts</h1>
        <Posts />
      </>
    </QueryClientProvider>
  );
}

export default App;
