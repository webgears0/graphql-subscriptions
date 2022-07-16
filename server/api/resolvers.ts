import { createNewPost, fetchPosts } from '../services/posts.services.js';
import { CreatePostRequest, CreatePostResponse } from '../types/posts.types.js';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { CreateCommentRequest, CreateCommentResponse } from '../types/comment.types.js';
import { createNewComment } from '../services/comment.service.js';

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
      pubsub.publish("POST_CREATED", { postCount });

      return response;
    },
    createComment(_parent: unknown, args: CreateCommentRequest, _context: unknown): CreateCommentResponse {
      const response = createNewComment(args)

      const { comment } = response;
      pubsub.publish("COMMENT_ADDED", { commentAdded: comment })

      return response;
    }
  },
  Subscription: {
    postCount: {
      // Basic subscription implementation
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["COMMENT_ADDED"]),
        (payload, variables) => {
          // Example with filter
          return (
            payload.commentAdded.content.length > variables.input.filter.contentLength
          );
        },
      )
    }
  },
};

export default resolvers;
