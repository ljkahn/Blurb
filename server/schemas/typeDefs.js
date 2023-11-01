const typeDefs = `
  type User {
    _id: ID
    username: String
    followers: [User]
    following: [User]
    blurbs: [Blurbs]
    profile: Profile!
  }
  
  type Profile {
    _id: ID
    fullName: String
    email: String
    password: String
    profilePic: String
    bio: String
    location: String
  }
  
  type Blurbs {
    _id: ID
    blurbText: String
    blurbAuthor: String
    createdAt: String
    comments: [Comment]
    likes: Int
  }
  
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    likes: Int
    updatedAt: String
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
    addUser(username: String!, profile: AddUserProfileInput): Auth
  }

  input AddUserProfileInput {
    fullName: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;

// type Mutation {
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
