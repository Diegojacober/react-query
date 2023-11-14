import "./App.css";
import { InfinitePeople } from "./components/people/InifinitePeople";
import { InfiniteSpecies } from "./components/species/InfiniteSpecies";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCLient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <>
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
      </>
    </QueryClientProvider>
  );
}

export default App;
