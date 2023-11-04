import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($blurbId: ID!, $commentText: String!) {
    addComment(blurbId: $blurbId, commentText: $commentText)
  }
`;

//example add comment variables
// {
//   "blurbId": null,
//   "commentText": null
// }

export const REMOVE_COMMENT = gql`
  mutation removeComment($blurbId: ID!, $commentId: ID!) {
    removeComment(blurbId: $blurbId, commentId: $commentId)
  }
`;

//example remove comment variables
// {
//   "blurbId": null,
//   "commentId": null
// }

export const EDIT_COMMENT = gql`
  mutation editComment(
    $blurbId: ID!
    $commentId: ID!
    $newCommentText: String!
  ) {
    editComment(
      blurbId: $blurbId
      commentId: $commentId
      newCommentText: $newCommentText
    )
  }
`;

//exmaple edit comment variables
// {
//   "blurbId": null,
//   "commentId": null,
//   "newCommentText": null
// }

export const ADD_COMMENT_LIKE = gql`
  mutation addCommentLike($blurbId: ID!, $commentId: ID!) {
    addCommentLike(blurbId: $blurbId, commentId: $commentId)
  }
`;

//example add comment like variables
// {
//   "blurbId": null,
//   "commentId": null
// }

export const REMOVE_COMMENT_LIKE = gql`
  mutation removeCommentLike($blurbId: ID!, $commentId: ID!) {
    removeCommentLike(blurbId: $blurbId, commentId: $commentId)
  }
`;

//example remove comment like variables
// {
//   "blurbId": null,
//   "commentId": null
// }
