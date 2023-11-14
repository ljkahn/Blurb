import { gql } from "@apollo/client";

export const ADD_Blurb = gql`
  mutation addBlurb($blurbText: String!, $tags: [Tag]) {
    addBlurb(blurbText: $blurbText, tags: $tags)
  }
`;

export const REMOVE_Blurb = gql`
  mutation removeBlurb($blurbId: ID!) {
    removeBlurb(blurbId: $blurbId)
  }
`;

export const EDIT_Blurb = gql`
  mutation editBlurb($blurbId: ID!, $blurbText: String!) {
    editBlurb(blurbId: $blurbId, blurbText: $blurbText)
  }
`;

export const LIKE_Blurb = gql`
  mutation likeBlurb($blurbId: ID!) {
    addLike(blurbId: $blurbId)
  }
`;

export const UNLIKE_Blurb = gql`
  mutation removeLike($blurbId: ID!) {
    removeLike(blurbId: $blurbId)
  }
`;

export const FIND_BLURB_BY_ID = gql`
  query getBlurbById($blurbId: ID!) {
    blurb(id: $blurbId) {
      _id
      blurbText
      likes
      likeList
      blurbAuthor {
        username
      }
      createdAt
    }
  }
`;
