function helloWorld() {
  return 'Hello, World!';
}

const resolvers = {
  Query: {
    helloWorld,
  },
};

export default resolvers;
