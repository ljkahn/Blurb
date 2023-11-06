import { gql } from "@apollo/client";

export const ALL_BLURBS = gql`
  query allBlurbs {
    blurbs {
      _id
      blurbText
      blurbAuthor {
        username
        profile {
          profilePic
        }
      }
      createdAt
      comments {
        commentText
        commentAuthor {
          username
        }
        likes
      }
      likes
    }
  }
`;
export const RANDOM_BLURB = gql`
  query randomBlurb {
    randomBlurb {
      blurbText
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
        commentAuthor {
          username
        }
        commentText
        updatedAt
        likes
        createdAt
        _id
      }
    }
  }
`;
