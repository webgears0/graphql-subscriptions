import { CreateCommentRequestInput } from '../types/comment.types.js'
import { v4 as uuidv4 } from 'uuid';

export function createNewComment({ input }: {
  input: CreateCommentRequestInput
}) {
  const { postId: rawPostId, content: rawContent } = input;
  // TODO add validation post request id is related to valid post
  const postId = rawPostId.trim();
  const content = rawContent.trim();

  const comment = {
    id: uuidv4(),
    postId,
    content,
    createdAt: new Date(),
  };

  return { comment };
};
