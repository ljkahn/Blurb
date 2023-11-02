import {gql} from '@apollo/client';

export const ADD_USER = gql `
mutation addUser($username: String!, $profile: ProfileInput!) {
  addUser(username: $username, profile: $profile) {
    token
  }
}
`;