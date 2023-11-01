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
      email: String!
      password: String!
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
      fullName: String!
      email: String!
      password: String!
      profilePic: String
      bio: String
      location: String
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
      editUser(username: String!, input: UserInput!): User
      editProfile(fullName: String!, email: String!, profilePic: String, bio: String, location: String): Profile
      deleteUser(username: String!): String
      addLike(blurbID: ID!): Blurbs
      removeLike(blurbID: ID!): Blurbs
      addBlurb(blurbText: String!, blurbAuthor: String!): Blurbs
      editBlurb(blurbID: ID!, blurbText: String): Blurbs
      removeBlurb(blurbID: ID!): String
      addComment(blurbID: ID!, commentText: String!): Comment
      removeComment(blurbID: ID!, commentID: ID!): Blurbs
    }
    `;
    
    
    module.exports = typeDefs;