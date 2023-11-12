import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { Post, Comment } from "./queries/post/types";
import api from "./services/api";
import { Context } from "react";

async function fetchComments(ctx: QueryFunctionContext) {
  const [, postId] = ctx.queryKey;
  const { data } = await api.get<Comment[]>(`/comments/?postId=${postId}`);

  return data;
}

async function deletePost(ctx: QueryFunctionContext) {
  const [, postId] = ctx.queryKey;
  const { data } = await api.delete(`/posts/${postId}`);

  return data;
}

async function updatePost(ctx: QueryFunctionContext) {
  const [, postId] = ctx.queryKey;
  const { data } = await api.patch<Post>(`/posts/${postId}`, {
    title: "OOKKK",
  });

  return data;
}

type PostDetailProps = {
  post: Post;
};

export function PostDetail({ post }: PostDetailProps) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [`post-${post.id}-comments}`, post.id],
    queryFn: fetchComments,
    staleTime: 2000,
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
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
