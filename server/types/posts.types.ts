export interface CreatePostRequest {
  input: CreatePostRequestInput
}

export interface CreatePostRequestInput {
  title: string;
  content: string;
}

export interface CreatePostResponse {
  post: Post
}

export type Post = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
