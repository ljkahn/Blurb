import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $profile: ProfileInput!) {
    addUser(username: $username, profile: $profile) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        profile {
          fullName
          _id
        }
      }
      token
    }
  }
`;
