const { User, Blurbs } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, {userId}) => {
            return User.findOne({_id: userId});
        },

        blurbs: async () => {
            return Blurbs.find();
        },

        userBlurbs: async (parent, {username}) => {
            return Blurbs.find({blurbAuthor: username});
        },

        // me: async (parent, args, context) => {
        //     if(context.user) {
        //         return User.findOne({_id: context.user._id})
        //     }
        //     throw AuthenticationError;
        // }
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
    }
}



module.exports = resolvers;