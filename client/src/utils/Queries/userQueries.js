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
      notifications
      blurbs {
        _id
        blurbText
        createdAt
        tags
        likes
        likeList
        comments {
          likes
          likeList
          _id
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
        likes
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