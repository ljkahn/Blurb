const typeDefs = ` 
    type User {
      _id: ID!
      username: String
      followers: [User]
      following: [User]
      blurbs: [Blurbs]
      profile: Profile!
    }
    
    type Profile {
      _id: ID!
      fullName: String
      email: String
      password: String
      profilePic: String
      bio: String
      location: String
    }
    
    type Blurbs {
      _id: ID!
      blurbText: String
      blurbAuthor: User
      createdAt: String
      comments: [Comment]
      likes: Int
      tags: [String]
    }
    
    type Comment {
      _id: ID!
      commentText: String
      commentAuthor: User
      createdAt: String
      likes: Int
      updatedAt: String
    }
    
    input ProfileInput {
      fullName: String
      email: String
      password: String
      profilePic: String
      bio: String
      location: String
    }

    input BlurbInput {
      blurbText: String
      blurbAuthor: User
      createdAt: String
      comments: [Comment]
      likes: Int
      tags: [String]
    }
    
    input UserInput {
      username: String!
      profile: ProfileInput!
    }
    
    type Auth {
      token: ID!
      user: User
    }
    
    type Query {
      users: [User]
      user(username: String!): User
      userBlurbs(username: String!): [Blurbs]
      blurbs: [Blurbs]
      me: User
    }
    
    type Mutation {
      login(email: String!, password: String!): Auth 
      addUser(username: String!, profile: ProfileInput!): Auth 
      editUser(username: String, profile: ProfileInput): User
      deleteUser(userID: ID!): String
      addLike(blurbID: ID!): String
      removeLike(blurbID: ID!): String
      addBlurb(blurbText: String!, tags: [String]): [Blurbs]
      editBlurb(blurbID: ID!, blurbText: String!, tags: [String]): String
      removeBlurb(blurbID: ID!): String
      addComment(blurbID: ID!, commentText: String!): String
      removeComment(blurbID: ID!, commentID: ID!): String
      editComment(blurbID: ID!, commentID: ID!, newCommentText: String!):String
      addCommentLike(blurbID: ID!, commentID: ID!): String
      removeCommentLike(blurbID: ID!, commentID: ID!): String
    }
    `;

module.exports = typeDefs;
