import { gql } from "@apollo/client";

export const ALL_BLURBS = gql`
  query allBlurbs {
    blurbs {
      _id
      blurbText
      blurbAuthor {
        username
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
      }
    }
  }
`;

export const GET_BLURB_BY_ID = gql`
  query blurbsById($blurbId: ID!) {
    blurb(id: $blurbId) {
      _id
      blurbText
      blurbAuthor {
        username
      }
      createdAt
    }
  }
`;
