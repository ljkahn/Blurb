import { gql } from "@apollo/client";


export const ADD_COMMENT =gql 
`
mutation addComment($blurbId: ID!, $commentText: String!) {
  addComment(blurbID: $blurbId, commentText: $commentText)
}`


//example add comment variables
// {
//   "blurbId": null,
//   "commentText": null
// }

export const REMOVE_COMMENT = gql 
`
mutation removeComment($blurbId: ID!, $commentId: ID!) {
  removeComment(blurbID: $blurbId, commentID: $commentId)
}`

//example remove comment variables
// {
//   "blurbId": null,
//   "commentId": null
// }

export const EDIT_COMMENT = gql 
`
mutation editComment($blurbId: ID!, $commentId: ID!, $newCommentText: String!) {
  editComment(blurbID: $blurbId, commentID: $commentId, newCommentText: $newCommentText)
}`

//exmaple edit comment variables
// {
//   "blurbId": null,
//   "commentId": null,
//   "newCommentText": null
// }

export const ADD_COMMENT_LIKE = gql 
`
mutation addCommentLike($blurbId: ID!, $commentId: ID!) {
  addCommentLike(blurbID: $blurbId, commentID: $commentId)
}`

//example add comment like variables
// {
//   "blurbId": null,
//   "commentId": null
// }

export const REMOVE_COMMENT_LIKE =gql 
`
mutation removeCommentLike($blurbId: ID!, $commentId: ID!) {
  removeCommentLike(blurbID: $blurbId, commentID: $commentId)
}`


//example remove comment like variables
// {
//   "blurbId": null,
//   "commentId": null
// }
