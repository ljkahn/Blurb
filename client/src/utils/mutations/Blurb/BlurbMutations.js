import { gql } from "@apollo/client";

export const ADD_Blurb = gql`
  mutation addBlurb($blurbText: String!, $tags: [Tag], $blurbAuthorId: ID!) {
    addBlurb(
      blurbText: $blurbText
      tags: $tags
      blurbAuthorId: $blurbAuthorId
    ) {
      _id
      createdAt
      blurbText
      blurbAuthor {
        profile {
          profilePic
        }
        username
      }
    }
  }
`;

export const REMOVE_Blurb = gql`
  mutation removeBlurb($blurbId: ID!) {
    removeBlurb(blurbID: $blurbId)
  }
`;

export const EDIT_Blurb = gql`
  mutation editBlurb($blurbId: ID!, $blurbText: String!) {
    editBlurb(blurbID: $blurbId, blurbText: $blurbText)
  }
`;

export const LIKE_Blurb = gql`
  mutation likeBlurb($blurbId: ID!) {
    addLike(blurbID: $blurbId)
  }
`;

export const UNLIKE_Blurb = gql`
  mutation unlikeBlurb($blurbId: ID!) {
    addLike(blurbID: $blurbId)
  }
`;
