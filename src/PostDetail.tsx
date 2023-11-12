import {
  useQuery,
  QueryFunctionContext,
  useMutation,
} from "@tanstack/react-query";
import { Post, Comment } from "./queries/post/types";
import api from "./services/api";

async function fetchComments(ctx: QueryFunctionContext) {
  const [, postId] = ctx.queryKey;
  const { data } = await api.get<Comment[]>(`/comments/?postId=${postId}`);

  return data;
}

type DeletePostResponse = {
  success: boolean;
  message: string;
  // Pode conter outros campos relevantes à sua aplicação
};

async function deletePost(postId: number): Promise<DeletePostResponse> {
  try {
    await api.delete(`/posts/${postId}`);
    return { success: true, message: "Post deleted successfully." };
  } catch (error) {
    // Se houver algum erro durante a deleção, você pode tratá-lo aqui
    console.error("Error deleting post:", error);
    return { success: false, message: "Error deleting post." };
  }
}

async function updatePost(postId: number) {
  const { data } = await api.patch<Post>(`/posts/${postId}`, {
    title: "NEW TITLE",
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

  const deleteMutation = useMutation({ mutationFn: deletePost });

  const handleDeleteClick = async () => {
    deleteMutation.mutate(post.id);
  };


  const patchMutation = useMutation({mutationFn: updatePost})

  const handleUpdatePost = async () => {
    patchMutation.mutate(post.id)
  }


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
      <button onClick={handleDeleteClick}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}
      {deleteMutation.isPending && (
        <p style={{ color: "purple" }}>Deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has (not) been deleted</p>
      )}
      <button onClick={handleUpdatePost}>Update title</button>
      {patchMutation.isPending && (
        <p style={{ color: "purple" }}>Updating the post</p>
      )}
      {patchMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has (not) been updated</p>
      )}
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
