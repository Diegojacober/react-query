import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";
import api from "../../services/api";

const fetchPosts = async ({ pageParam = 1 }) => {
  const { data } = await api.get<PersonProps>(`/people/`, {
    params: { page: pageParam },
  });
  return { data };
};

interface Page {
  data: {
    results: PersonProps[];
    nextCursor?: number;
    previousCursor?: number;
  };
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
    isLoading, // If the query function is running
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status, // 'error' | 'loading' | 'success' - indicates state of this hook
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["data"],
    queryFn: fetchPosts,
    getLastPageParam: (firstPage: Page) => firstPage.previousCursor,
    getNextPageParam: (lastPage: Page) => lastPage.next || undefined,
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error! {error.message}</div>;
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map((pageData) => {
          return pageData.data.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
