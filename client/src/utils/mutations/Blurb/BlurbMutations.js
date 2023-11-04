import { gql } from "@apollo/client";

export const ADD_Blurb = gql`
  mutation addBlurb($blurbText: String!, $tags: [Tag]) {
    addBlurb(blurbText: $blurbText, tags: $tags)
  }
`;

export const REMOVE_Blurb = gql`
  mutation removeBlurb($blurbId: ID!) {
    removeBlurb(blurbID: $blurbId)
  }
`;

export const EDIT_Blurb = gql`
  mutation editBlurb($blurbId: ID!, $blurbText: String!) {
    editBlurb(
      blurbId: $blurbId
      blurbAuthor: $blurbAuthor
      blurbText: $blurbText
    )
  }
`;

export const LIKE_Blurb = gql`
  mutation likeBlurb($blurbId: ID!) {
    addLike(blurbID: $blurbId)
  }
`;

export const UNLIKE_Blurb = gql`
  mutation removeLike($blurbId: ID!) {
    removeLike(blurbID: $blurbId)
  }
`;

export const GET_BLURB_BY_ID = gql`
  query getBlurbById($blurbId: ID!) {
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
