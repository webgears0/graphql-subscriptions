interface BaseMutationRequest {
  parent: string;
  context: string;
}

interface CreatePostRequest {
  input: CreatePostRequestInput
}

interface CreatePostRequestInput {
  title: string;
  content: string;
}

interface CreatePostResponse {
  post: Post
}

type Post = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

function helloWorld() {
  return 'Hello, World!';
}

function createNewPost({ input }: {
  input: CreatePostRequestInput
}) {
  const { title: rawTitle, content: rawContent } = input;
  const title = rawTitle.trim();
  const content = rawContent.trim();

  const post = {
    title,
    content,
    createdAt: new Date(),
  }

  return { post };
}

const resolvers = {
  Query: {
    helloWorld,
  },
  Mutation: {
    createPost(_parent: unknown, args: CreatePostRequest, _context: unknown): CreatePostResponse {     
      return createNewPost(args)
    }
  }
};

export default resolvers;
