import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
  query repoReviews(
    $repositoryId: ID!
    $reviewsFirst: Int
    $reviewsAfter: String
  ) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $reviewsFirst, after: $reviewsAfter) {
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
          cursor
        }
        totalCount
        pageInfo {
          endCursor
          startCursor
          hasNextPage
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
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
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
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

// other queries...
