export interface CreateCommentRequest {
  input: CreateCommentRequestInput;
}

export interface CreateCommentRequestInput {
  postId: string;
  content: string;
}

export interface CreateCommentResponse {
  comment: Comment;
}

export type Comment = {
  id: string;
  postId: string;
  content: string;
  createdAt: Date;
}
