import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser($userId: ID) {
    getUser(userId: $userId) {
      username
      password
    }
  }
`;

export const QUERY_USERS = gql`
  query getAllUsers {
    getAllUsers {
      _id
      username
      password
    }
  }
`;

export const QUERY_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      _id
      text
      picture
      userId {
        _id
        username
      }
    }
  }
`;

export const QUERY_POST = gql`
  query getPost($postId: ID) {
    getPost(postId: $postId) {
      _id
      text
      picture
      userId {
        _id
        username
      }
    }
  }
`;
