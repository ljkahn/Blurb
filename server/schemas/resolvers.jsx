const { User , Blurb } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        //get all users
        users: async () => {
            return User.find();
        },

        //get one user by id
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId});
        },

        //get blurb from username 
        blurbs: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Blurb.find(params).sort({ createdAt: -1 });
        },

        me: async (parent, args, context) => {
            if(context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw AuthenticationError;
        }
    },


    Mutation: {
        addUser: async (parent, { username, profile }) => {
            console.log('Attempting to add user');
            try {
                const user = await User.create({ username, profile });
                console.log('User created:', user);
                const token = signToken(user);
                return { token, user };
                } catch (error) {
                console.log('Error creating user:', error);
                throw new Error('Failed to add user');
                }
            },



    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

        addBlurb: async (parent, { blurbText }, context) => {
      if (context.user) {
        const blurb = await Blurb.create({
          blurbText,
          blurbAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { blurbs: blurb._id } }
        );

        return blurb;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

     addComment: async (parent, { blurbId, commentText }, context) => {
      if (context.user) {
        return Blurb.findOneAndUpdate(
          { _id: blurbId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    

        // Set up mutation so a logged in user can only remove their profile and no one else's
    deleteUser: async (parent, args, context) => {

      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

        removeBlurb: async (parent, { blurbId }, context) => {
      if (context.user) {
        const blurb = await Blurb.findOneAndDelete({
          _id: blurbId,
          blurbAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { blurbs: blurb._id } }
        );

        return blurb;
      }
      throw AuthenticationError;
    },

    removeComment: async (parent, { blurbId, commentId }, context) => {
      if (context.user) {
        return Blurb.findOneAndUpdate(
          { _id: blurbId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

         addLike: async (parent, { blurbId }, context) => {
      if (!context.user) {
          throw new Error('you must be logged in to like a blurb')
    }

    const updatedBlurb = await Blurb.findByIdAndUpdate(
      blurbId,
      {$inc: {likes: 1}},
      {new: true}
    )
if(!updatedBlurb) {
  throw new Error('Blurb not found!')
}
return updatedBlurb;
},

  removeLike: async (parent, { blurbId }, context) => {
    // if (!context.user) {
    //     throw new Error('you must be logged in to like a blurb')
    // }

    const updatedBlurb = await Blurb.findByIdAndUpdate(
      blurbId,
      {$inc: {likes: -1}},
      {new: true}
    )
if(!updatedBlurb) {
  throw new Error('Blurb not found!')
}
return updatedBlurb;
}


// type Mutation {
//     login(email: String!, password: String!): Auth x
//     logout()
//   addUser(username: String!, email: String!, password: String!): Auth x
//   followUser()
//   unfollowUser()
//   editUser()
//   // editProfile() ?
//   deleteUser() x
//   addLike(blurbText: String!, ) x
//   removeLike() x
//   addBlurb(blurbText: String!): Blurb x
//   editBlurb() 
//   removeBlurb() x
//   addComment(blurbID: ID!, commentText: String!): Blurb x
//   removeComment() x

}
module.exports = resolvers;