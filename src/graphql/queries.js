import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
  query repoReviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      ownerAvatarUrl
      url
      language
      forksCount
      stargazersCount
      reviewCount
      ratingAverage
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query allRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          ownerName
          name
          fullName
          createdAt
          ratingAverage
          reviewCount
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
        cursor
      }
    }
  }
`;

// other queries...
