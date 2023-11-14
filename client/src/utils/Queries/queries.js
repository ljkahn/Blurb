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