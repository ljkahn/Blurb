import { gql } from '@apollo/client';

export const QUERY_MY_PROFILE = gql `
query me {
  me {
    token
    followerNumber
    followingNumber
    username
    blurbs {
      blurbText
      likes
      comments {
        commentText
        commentAuthor {
          username
        }
      }
    }
    profile {
      bio
      fullName
      location
      profilePic
      email
    }
  }
}
`

export const QUERY_ONE_USER = gql `
query user($username: String!) {
  user(username: $username) {
    followerNumber
    followingNumber
    username
    profile {
      _id
      fullName
      location
      bio
      profilePic
    }
  }
}
`