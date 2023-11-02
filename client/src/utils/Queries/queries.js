import { gql } from '@apollo/client';

export const QUERY_Blurbs = gql`
query allBlurbs {
    blurbs {
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