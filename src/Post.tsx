import { useState } from "react";
import { PostDetail } from "./PostDetail";
import { Post } from "./queries/post/types";
import api from "./services/api";
import { useQuery } from "@tanstack/react-query";
const maxPostPage = 10;

async function fetchPosts() {
  const { data } = await api.get<Post[]>(`/posts?_limit=10&_page=0`);

  return data;
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts, staleTime: 2000 });
  if (isLoading) return <h3>Loading...</h3>;

  if (isError) return <h3>Oops, somenthing went wrong <p>{error.message}</p></h3>;

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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
