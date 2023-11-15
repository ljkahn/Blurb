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

export const QUERY_GET_NOTIFICATIONS = gql`
  query GetMyNotifications {
    me {
      _id
      notifications {
        _id
        type
        sender {
          username
        }
        blurbId
        createdAt
      }
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: ID!) {
    markNotificationAsRead(notificationId: $notificationId)
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
        likeList
        blurbText
        comments {
          _id
          commentText
          likes
          likeList
        }
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

export const GET_FOLLOWERS = gql`
query GetFollowers($userId: ID!) {
  userFollowers(userId: $userId) {
    _id
    username

  }
}
`;