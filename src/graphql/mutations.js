import { gql } from "@apollo/client";

export const ADD_REVIEW = gql`
  mutation addReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      id
      user {
        id
        username
      }
      repository {
        id
        fullName
      }
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
`;

export const SIGN_IN = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
