import { createNewPost, fetchPosts } from '../services/posts.services.js';
import { CreatePostRequest, CreatePostResponse } from '../types/posts.types.js';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
let postCount = 0;

const resolvers = {
  Query: {
    posts(_parent: unknown, _args: unknown, _context: unknown) {
      return fetchPosts();
    },
  },
  Mutation: {
    createPost(_parent: unknown, args: CreatePostRequest, _context: unknown): CreatePostResponse {     
      const response = createNewPost(args);

      postCount++;
      console.log(postCount)
      pubsub.publish("POST_CREATED", { postCount });

      return response;
    },
  },
  Subscription: {
    postCount: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  },
};

export default resolvers;
