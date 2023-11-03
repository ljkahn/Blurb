import {gql} from '@apollo/client';

export const ADD_USER = gql `
mutation addUser($username: String!, $profile: ProfileInput!) {
  addUser(username: $username, profile: $profile) {
    token
  }
}
`;

export const LOGIN_USER = gql
`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
   token
    user {
      _id
      profile {
        fullName
        _id
      }
    }
  }
}
`;



export const EDIT_USER = gql
`mutation editUser($username: String, $profile: ProfileInput) {
  editUser(username: $username, profile: $profile) {
    username
    profile {
      bio
      email
      fullName
      location
      password
      profilePic
    }
  }
`

//example edit user variables
// {
//   "username": null,
//   "profile": {
//     "bio": null,
//     "email": null,
//     "fullName": null,
//     "location": null,
//     "password": null,
//     "profilePic": null
//   }
// }


export const DELETE_USER = gql
`mutation deleteUser($userId: ID!) {
  deleteUser(userID: $userId)
}`

//example delte user variables
// {
//   "userId": null
// }