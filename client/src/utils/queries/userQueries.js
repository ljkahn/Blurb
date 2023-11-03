import { gql } from "@apollo/client";

export const QUERY_MY_PROFILE = gql`
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
`;
export const USER_LIST = gql`
  query user_list {
    users {
      username
      _id
    }
  }
`;
