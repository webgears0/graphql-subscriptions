import { createNewPost, fetchPosts } from '../services/posts.services.js';
import { CreatePostRequest, CreatePostResponse } from '../types/posts.types.js';

const resolvers = {
  Query: {
    posts(_parent: unknown, _args: unknown, _context: unknown) {
      return fetchPosts();
    },
  },
  Mutation: {
    createPost(_parent: unknown, args: CreatePostRequest, _context: unknown): CreatePostResponse {     
      return createNewPost(args)
    }
  }
};

export default resolvers;
