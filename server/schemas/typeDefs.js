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
  }
  
  input UserInput {
    username: String!
    profile: ProfileInput!
  }

  type Auth {
    token: String!
    user: User!
  }
  
  
  type Query {
    users: [User]
    user(username: String!): User
    userBlurbs(username: String): [Blurbs]
    blurbs: [Blurbs]
    me: User
  }

  
  type Mutation {
    login(email: String!, password: String!): Auth
        
    addUser(
      username: String!
      profile: ProfileInput! 
      ): Auth!
  }
  `;
  
  module.exports = typeDefs;
  
    
      // Logout????




      //   followUser()
      //   unfollowUser()
      //   editUser()
      //   editProfile() 
      //   deleteUser()
      //   addLike(blurbText: String! )
      //   removeLike()
//   addBlurb(blurbText: String!): Blurb
//   editBlurb()
//   removeBlurb()
//   addComment(blurbID: ID!, commentText: String!): Blurb
//   removeComment()

// }
