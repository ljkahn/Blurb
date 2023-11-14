import { gql } from "@apollo/client";

export const ALL_BLURBS = gql`
  query allBlurbs {
    blurbs {
      _id
      blurbText
      likes
      likeList
      blurbAuthor {
        username
        profile {
          profilePic
        }
      }
      createdAt
      comments {
        _id
        likes
        likeList
        commentText
        commentAuthor {
          username
        }
      }
    }
  }
`;

export const RANDOM_BLURB = gql`
  query randomBlurb {
    randomBlurb {
      blurbText
      likes
      likeList
      blurbAuthor {
        username
        profile {
          profilePic
        }
      }
    }
  }
`;

// export const BLURB_LIKED_SUBSCRIPTION = gql`
//   subscription OnBlurbLiked($blurbId: ID!) {
//     blurbLiked(blurbId: $blurbId) {
//      blurbs {
//       _id
//       blurbAuthor {
//         username
//         profile {
//           profilePic
//         }
//       }
//       createdAt
//       comments {
//         _id
//         likes
//         likeList
//         commentText
//         commentAuthor {
//           username
//         }
//       }
//     }
//     }
//   }
// `;

// export const USER_FOLLOWED_SUBSCRIPTION = gql`
//   subscription OnUserFollowed($userId: ID!) {
//     userFollowed(userId: $userId) {
//       id
//       username
//       followers {
//         id
//         username
//       }
//     }
//   }
// `;

// // Usage in a React component


// export const BLURB_COMMENTED_SUBSCRIPTION = gql`
//   subscription OnBlurbCommented($blurbId: ID!) {
//     blurbCommented(blurbId: $blurbId) {
//       _id
//       comments {
//         _id
//         commentText
//         commentAuthor {
//           _id
//           username
//         }
//       }
//     }
//   }
// `;


export const FIND_BLURB_BY_ID = gql`
  query Query($blurbId: ID!) {
    findBlurbById(blurbId: $blurbId) {
      _id
      blurbAuthor {
        username
      }
      createdAt
      comments {
        _id
        commentAuthor {
          username
        }
        commentText
        updatedAt
        likes
        likeList
        createdAt
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers {
    followers {
      _id
      username
    }
  }
`;