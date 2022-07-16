# graphql-subscriptions

Development ready server for GraphQL Subscriptions using Apollo.
A crude implementation for the purposes of exploring the basic principles of subscriptions and graphql.

## Run server

```
yarn install && yarn run dev
```

## Requests

Go to `localhost:4000/graphql` and use the prepackaged apollograph studio.

### Create Posts

Use the following mutation to create a post

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

```
{
  title: string;
  content: string;
}
```

### View posts

Use the following query to view created posts

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

### Post Count

To subscribe to receive updates on the total number of posts created, use the following subscription

```graphql
subscription {
  postCount
}
```
