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
    notify {
      _id
      notifications {
        _id
        type
        sender {
          username
          profile {
            profilePic
          }
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

export const FOLLOWED_USERS_BLURBS = gql`
query followedUsersBlurbs {
  followedUsersBlurbs {
    _id
    blurbAuthor {
      username
      _id
      profile {
        profilePic
      }
    }
    blurbText
    likes
    likeList
    comments {
      _id
      commentAuthor {
        username
      }
      commentText
      likeList
      likes
    }
    tags
    createdAt
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

export const GET_FOLLOWING = gql`
query GetFollowing($userId: ID!) {
  userFollowing(userId: $userId) {
    _id
    username

  }
}
`;
// export const FOLLOWED_USER_BLURBS = gql`
//   query followedUsersBlurbs
// `

export const GET_USER_MESSAGES = gql`
query GetUserMessages {
  userMessages {
    receiver {
      id
      username
    }
    timestamp
  }
}
`;

export const GET_CONVERSATION_MESSAGES = gql`
query GetConversationMessages($conversationId: ID!) {
  conversationMessages(conversationId: $conversationId) {
    id
    text
    sender {
      id
      username
    }
    receiver {
      id
      username
    }
    timestamp
  }
}
`;

