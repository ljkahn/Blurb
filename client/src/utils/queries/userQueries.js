import { gql } from '@apollo/client';

export const QUERY_MY_PROFILE = gql `
query me {
  me {
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