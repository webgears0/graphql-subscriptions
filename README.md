# graphql-subscriptions

Development ready server for GraphQL Subscriptions using Apollo.
A crude implementation for the purposes of exploring the basic principles of subscriptions and graphql.

## Run server

```
yarn install && yarn run dev
```

## Requests

Go to `localhost:4000/graphql` and use the prepackaged apollograph studio.

## Queries

### View posts

Use the following query to view created posts:

```graphql
query {
  posts {
    content
    title
    createdAt
    updatedAt
  }
}
```

## Mutations

### Create Posts

Use the following mutation to create a post:

```graphql
mutation ($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      title
      content
      createdAt
      updatedAt
    }
  }
}
```

with `CreatePostInput`

```js
{
  title: string;
  content: string;
}
```

### Create Comment

Use the following mutation to add a comment to a post:

```graphql
mutation ($input: CreateCommentInput!) {
  createComment(input: $input) {
    comment {
      id
      postId
      content
      createdAt
    }
  }
}
```

with `CreateCommentInput`

```js
{
  postId: string;
  content: string;
}
```

## Subscriptions

### Post Count

To subscribe to receive updates on the total number of posts created, use the following subscription:

```graphql
subscription {
  postCount
}
```

### Comment Added

To track when a comment is added to a post use the following subscription:
Note you can apply a filter to only recieve updates for comments that are greater than the given length.

```graphql
subscription ($input: CommentAddedInput) {
  commentAdded(input: $input) {
    id
    postId
    content
    createdAt
  }
}
```

with `CommentAddedInput`

```js
{
  filter: {
    contentLength: number;
  }
}
```
