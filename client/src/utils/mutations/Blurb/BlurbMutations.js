import {gql} from '@apollo/client';

export const ADD_Blurb = gql `
mutation Mutation($blurbText: String!) {
    addBlurb(blurbText: $blurbText)
  }
`;

export const REMOVE_Blurb = gql `
mutation Mutation($blurbId: ID!) {
    removeBlurb(blurbID: $blurbId)
  }
`;

export const EDIT_Blurb = gql `
mutation Mutation($blurbId: ID!, $blurbText: String!) {
    editBlurb(blurbID: $blurbId, blurbText: $blurbText)
  }
`;

export const LIKE_Blurb = gql `
mutation Mutation($blurbId: ID!) {
    addLike(blurbID: $blurbId)
  }
`;

export const UNLIKE_Blurb = gql `
mutation Mutation($blurbId: ID!) {
    addLike(blurbID: $blurbId)
  }
`;


