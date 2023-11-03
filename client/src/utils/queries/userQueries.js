import { gql } from '@apollo/client';

export const QUERY_MY_PROFILE = gql`
  query me {
    me {
      _id
      username
      profile {
        bio
        email
        fullName
        location
        profilePic
      }
      followingNumber
      followerNumber
      blurbs {
        blurbText
        comments {
          likes
          commentText
          commentAuthor {
            username
          }
        }
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