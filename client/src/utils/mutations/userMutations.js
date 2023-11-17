import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $profile: ProfileInput!) {
    addUser(username: $username, profile: $profile) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
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

export const EDIT_USER = gql`
  mutation editUser($username: String, $profile: ProfileInput) {
    editUser(username: $username, profile: $profile) {
      username
      profile {
        bio
        fullName
        location
        profilePic
      }
    }
  }
`;

export const EDIT_ACCOUNT = gql`
  mutation editAccount($password: String, $email: String) {
    editAccount(password: $password, email: $email) {
      profile {
        email
        password
      }
    }
  }
`;
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

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userID: $userId)
  }
`;

//example delte user variables
// {
//   "userId": null
// }

export const FOLLOW_USER = gql`
  mutation followUser($userIdToFollow: ID!) {
    followUser(userIdToFollow: $userIdToFollow)
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser($userIdToUnfollow: ID!) {
    unfollowUser(userIdToUnfollow: $userIdToUnfollow)
  }
`;
// export const RESET_PASSWORD = gql`
//   mutation resetPassword($email: String!, $token: String!, $newPassword: String!) {
//     resetPassword(email: $email, token: $token, newPassword: $newPassword) {
//       token
//       user {
//         _id
//         profile {
//           fullName
//           _id
//         }
//       }
//     }
//   }
//   `

export const PASSWORD_RESET = gql`
  mutation passwordReset($token: String!, $email: String!) {
    passwordReset(token: $token, email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;
