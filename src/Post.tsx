import { useEffect, useState } from "react";
import { PostDetail } from "./PostDetail";
import { Post } from "./queries/post/types";
import api from "./services/api";
import {
  useQuery,
  QueryFunctionContext,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
const maxPostPage = 10;

async function fetchPosts(ctx: QueryFunctionContext) {
  const [, pageNum] = ctx.queryKey;
  const { data } = await api.get<Post[]>(`/posts?_limit=10&_page=${pageNum}`);

  return data;
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: fetchPosts,
      });
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: fetchPosts,
    staleTime: 2000,
    placeholderData: keepPreviousData,
  });
  if (isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <h3>
        Oops, somenthing went wrong <p>{error.message}</p>
      </h3>
    );

  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previouesValue) => previouesValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previouesValue) => previouesValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
