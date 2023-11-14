import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";
import api from "../../services/api";

const fetchPosts = async ({ pageParam = 1 }) => {
  const data = await api.get<PersonProps>(`/people/`, {
    params: { page: pageParam },
  });
  return data;
};

interface Page {
  data: any;
  previousCursor?: number;
  nextCursor?: number;
}

export function InfinitePeople() {
  const {
    data, // data accumulated across all pages: InfiniteQueryData<Page>
    error, // any Error that has occurred
    fetchNextPage, // Function to fetch the next page
    fetchPreviousPage,
    hasNextPage, // Boolean that indicates if the next page is available
    hasPreviousPage,
    isError, // If an Error has occurred
    isFetching, // If the query function is running
    isFetchingNextPage,
    isFetchingPreviousPage,
    status, // 'error' | 'loading' | 'success' - indicates state of this hook
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["data"],
    queryFn: fetchPosts,
    getLastPageParam: (firstPage: Page, pages: Page[]) =>
      firstPage.previousCursor,
    getNextPageParam: (lastPage: Page, pages: Page[]) => lastPage.nextCursor,
  });

  console.log(data)
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
}
