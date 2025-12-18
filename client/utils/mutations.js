import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String, $password: String) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($text: String, $picture: String) {
    createPost(text: $text, picture: $picture) {
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
        posts {
          _id
          text
          picture
          userId {
            _id
            username
          }
        }
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID) {
    deleteUser(userId: $userId)
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID) {
    deletePost(postId: $postId)
  }
`;
