import { gql } from "@apollo/client";
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
        _id
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
`;

export const QUERY_ONE_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      followerNumber
      followingNumber
      followers {
        _id
        username
      }
      following {
        _id
        username
      }
      profile {
        bio
        fullName
        location
        profilePic
        email
      }
      blurbs {
        blurbText
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