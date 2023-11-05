const typeDefs = `
    enum Tag {
      FUNNY
      INSPIRATIONAL
      LIFE
      LOVE
      NATURE
      TRAVEL
      MUSIC
      FITNESS
      FOOD
      ART
      TECH
      SPORTS
      HEALTH
      FASHION
      BEAUTY
      SCIENCE
      EDUCATION
      POLITICS
      BUSINESS
      PHOTOGRAPHY
    }

    type User {
      _id: ID!
      username: String
      followers: [User]
      following: [User]
      blurbs: [Blurbs]
      profile: Profile!
      followerNumber: Int
      followingNumber: Int
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
      tags: [Tag]
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
      blurbsByTag(tags: [Tag]!): [Blurbs]
      blurbsById(blurbId: ID!): Blurbs
      me: User
      randomBlurb: Blurbs
      followers: [User]
      following: [User]
    }
    
    type Mutation {
      login(email: String!, password: String!): Auth 
      addUser(username: String!, profile: ProfileInput!): Auth 
      editUser(username: String, profile: ProfileInput): User
      editAccount(password: String, email: String): User
      deleteUser(userID: ID!): String
      addLike(blurbId: ID!): String
      removeLike(blurbId: ID!): String
      addBlurb(blurbText: String!, tags: [Tag]): String
      editBlurb(blurbId: ID!, blurbText: String!, tags: [Tag]): String
      removeBlurb(blurbId: ID!): String
      addComment(blurbId: ID!, commentText: String!): String
      removeComment(blurbId: ID!, commentId: ID!): String
      editComment(blurbId: ID!, commentId: ID!, newCommentText: String!):String
      addCommentLike(blurbId: ID!, commentId: ID!): String
      removeCommentLike(blurbId: ID!, commentId: ID!): String
      followUser(userIdToFollow: ID!): String
      unfollowUser(userIdToUnfollow: ID!): String
    }
    `;

module.exports = typeDefs;
