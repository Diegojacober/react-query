import { Post, Comment } from "./queries/post/types";
import api from "./services/api";

async function fetchComments(postId: number) {
    const { data } = await api.get<Comment[]>(`/comments/?postId=${postId}`);

    return data;
  }
  
  async function deletePost(postId: number) {
    const { data } = await api.delete(`/posts/${postId}`);

    return data;
  }
  
  async function updatePost(postId: number) {
    const { data } = await api.patch<Post>(`/posts/${postId}`, {
        title: 'OOKKK'
    });

    return data;
  }
  
type PostDetailProps = {
    post: Post
}

  export function PostDetail({ post }: PostDetailProps) {
    // replace with useQuery
    const data:Comment[] = [];
  
    return (
      <>
        <h3 style={{ color: "blue" }}>{post.title}</h3>
        <button>Delete</button> <button>Update title</button>
        <p>{post.body}</p>
        <h4>Comments</h4>
        {data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
      </>
    );
  }
  