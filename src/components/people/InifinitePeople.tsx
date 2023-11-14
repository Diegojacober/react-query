import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";
import api from "../../services/api";


interface ApiResponse {
  results: PersonProps[];
  next: string | null;
}

const fetchPeople = async ({ pageParam = `/people/?page=1` }): Promise<ApiResponse> => {
  const response = await api.get(`${pageParam}`);
  return response.data;
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<ApiResponse, Error>({
    queryKey: ["people"],
    queryFn: fetchPeople,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const people = data.pages.flatMap((page) => page.results);

  return (
    <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
      <div>
        {people.map((person) => (
          <Person key={person.name} name={person.name} eyeColor={person.eye_color} hairColor={person.hair_color} />
        ))}

        {isFetching && <div>Fetching...</div>}
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </InfiniteScroll>
  );
}
