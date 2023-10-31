const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        users: async (parent, {userId}) => {
            return User.findOne({_id: profileId}).populate('blurbs');
        },

        // me: async (parent, args, context) => {
        //     if(context.user) {
        //         return User.findOne({_id: context.user._id})
        //     }
        //     throw AuthenticationError;
        // }
    }
}



module.exports = resolvers;