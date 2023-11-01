const { User, Blurbs } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      console.log("users");
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    //get blurb from username
    blurbs: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Blurbs.find(params).sort({ createdAt: -1 });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, profile }) => {
      console.log("Attempting to add user");
      try {
        const user = await User.create({ username, profile });
        console.log("User created:", user);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("Error creating user:", error);
        throw new Error("Failed to add user");
      }
    },
    // ✅

    login: async (parent, { email, password }) => {
      // Query the User model to find a user with the provided email within the profile subdocument
      const user = await User.findOne({ "profile.email": email });

      // If no user is found with the provided email, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }

      // Use the isCorrectPassword method within the profile subdocument to compare the provided password with the stored hashed password
      const correctPw = await user.profile.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Invalid email or password");
      }

      // Generate a token for the authenticated user
      const token = signToken(user);

      // Return the generated token and the user object
      return { token, user };
    },
    // ✅

    addBlurb: async (parent, { blurbText }, context) => {
      if (context.user) {
        // Create a new blurb using the Blurb model
        const blurb = await Blurbs.create({
          blurbText,
          blurbAuthor: context.user._id, // Use the user's ID as the blurbAuthor
        });
        // Update the user's blurbs array with the new blurb's ID
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { blurbs: blurb._id },
        });
        return blurb;
      } else {
        throw new AuthenticationError(
          "You need to be logged in to create a blurb!"
        );
      }
    },

    addComment: async (parent, { blurbId, commentText }, context) => {
      if (context.user) {
        return await Blurbs.findOneAndUpdate(
          { _id: blurbId },
          {
            $push: {
              comments: 
              { commentText, 
                commentAuthor: context.user.username,
                createdAt: new Date(),
                likes: 0,
            },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
      ("You need to be logged in to comment!");
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
        const blurb = await Blurbs.findOneAndDelete({
          _id: blurbId,
          blurbAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { blurbs: blurb._id } }
        );

        return "Blurb successfully deleted!";
      }
      throw AuthenticationError;
    },

    removeComment: async (parent, { blurbId, commentId }, context) => {
      if (context.user) {
        return Blurbs.findOneAndUpdate(
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
        return "Comment successfully deleted!";
      }
      throw AuthenticationError;
    },

    addLike: async (parent, { blurbId }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to like a blurb");
      }

      const updatedBlurb = await Blurbs.findByIdAndUpdate(
        blurbId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!updatedBlurb) {
        throw new Error("Blurb not found!");
      }
      return updatedBlurb;
    },

    removeLike: async (parent, { blurbId }, context) => {
      // if (!context.user) {
      //     throw new Error('you must be logged in to like a blurb')
      // }

      const updatedBlurb = await Blurbs.findByIdAndUpdate(
        blurbId,
        { $inc: { likes: -1 } },
        { new: true }
      );
      if (!updatedBlurb) {
        throw new Error("Blurb not found!");
      }
      return updatedBlurb;
    },

    editBlurb: async (parent, { blurbId, newContent }, context) => {
      // Verify the user's authentication token (You should implement your authentication logic here)
      if (!context.user) {
        throw new Error("You must be logged in to edit a blurb.");
      }

      // Assuming you have a function in your context to edit a blurb
      const updatedBlurb = await Blurbs.findByIdAndUpdate(
        blurbId,
        { blurbText: newContent },
        { new: true }
      );

      return updatedBlurb;
    },
  },
};
module.exports = resolvers;
