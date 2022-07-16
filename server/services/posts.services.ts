import { CreatePostRequestInput, Post } from '../types/posts.types.js';
import { v4 as uuidv4 } from 'uuid';

const posts: Post[] = [];

export function createNewPost({ input }: {
  input: CreatePostRequestInput
}) {
  const { title: rawTitle, content: rawContent } = input;
  const title = rawTitle.trim();
  const content = rawContent.trim();

  const post = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date(),
  };
  // update posts with new post
  posts.push(post);

  return { post };
};

export function fetchPosts() {
  return posts;
};
