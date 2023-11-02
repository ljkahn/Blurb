const { User, Blurbs } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      return User.find().populate("blurbs");
    },
    // ✅

    // Find single user by username( and populate blurbs or just get user???)
    user: async (parent, { username }) => {
      return User.findOne({ username: username }).populate("blurbs"); //.populate('blurbs')???
    },
    // ✅

    // get blurb from username
    userBlurbs: async (parent, { username }) => {
      if (username) {
        const user = await User.findOne({ username });
        if (!user) {
          return [];
        }
        const params = username ? { username } : {};

        // find blurbs by username and populate author and comments
        return Blurbs.find({ blurbAuthor: user._id })
          .populate("blurbAuthor")
          .sort({ createdAt: -1 })
          .populate({
            path: "comments",
            populate: {
              path: "commentAuthor",
              model: "User",
            },
          });
      }
      return [];
    },
    // ✅

    // get all blurbs and comments for each
    blurbs: async () => {
      return Blurbs.find()
        .populate("blurbAuthor")
        .sort({ createdAt: -1 })
        .populate({
          path: "comments",
          populate: {
            path: "commentAuthor",
            model: "User",
          },
        });
    },
    // ✅

    // find my user account
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("blurbs");
      }
      throw AuthenticationError("You need to be logged in!");
    },
    // ✅
  },

  Mutation: {
    addUser: async (parent, { username, profile }) => {
      console.log("Attempting to add user");
      try {
        const user = await User.create({ username, profile });
        // console.log("User created:", user);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        // console.log("Error creating user:", error);
        throw new Error("Failed to add user");
      }
    },
    // ✅

    login: async (parent, { email, password }) => {
      // Query the User model to find a user with the provided email within the profile subdocument
      const user = await User.findOne({ "profile.email": email });

      // If no user is found with the provided email, throw an AuthenticationError
      if (!user) {
        throw Error("Invalid email or password");
      }

      // Use the isCorrectPassword method within the profile subdocument to compare the provided password with the stored hashed password
      const correctPw = await user.profile.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw Error("Invalid email or password");
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
          // blurbAuthor = await Blurbs.findOne({ username: blurbAuthor })
          blurbText,
          blurbAuthor: context.user._id, // Use the user's ID as the blurbAuthor
        });
        // Update the user's blurbs array with the new blurb's ID
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { blurbs: blurb._id },
        });
        return "Successfully created Blurbo!";
      } else {
        throw Error("You need to be logged in to create a blurb!");
      }
    },
    // ✅

    addComment: async (parent, { blurbID, commentText }, context) => {
      if (context.user) {
        try {
          // Attempt to find and update the "Blurbs" document with the given "blurbID."
          const updatedBlurb = await Blurbs.findOneAndUpdate(
            { _id: blurbID },
            {
              // Use the $push operator to add a new comment object to the "comments" array.
              $push: {
                comments: {
                  commentText, // The text of the comment.
                  commentAuthor: context.user._id, // The ID of the user adding the comment.
                },
              },
            },
            {
              new: true, // Return the updated document.
              runValidators: true, // Run validation checks on the update.
            }
          );

          if (updatedBlurb) {
            // If the "updatedBlurb" document exists, find the newly added comment in the "comments" array.
            const newComment = updatedBlurb.comments.find(
              (comment) =>
                comment.commentText === commentText && // Match the comment text.
                comment.commentAuthor.equals(context.user._id) // Match the comment author (user ID).
            );

            if (newComment) {
              // If the new comment is found, return a success message.
              return "Successfully created Comment!";
            }
          }
          // If the comment creation or retrieval fails, throw an error.
          throw Error("Failed to create comment.");
        } catch (error) {
          // Handle any errors that occur during the process and throw a generic error message.
          throw new Error("An error occurred while creating the comment.");
        }
      } else {
        // If the user is not authenticated, throw an "AuthenticationError" with a specific message.
        throw Error("You need to be logged in to comment!");
      }
    },
    // ✅

    // Set up mutation so a logged in user can only remove their profile and no one else's
    deleteUser: async (parent, { userID }, context) => {
      if (context.user && context.user._id.toString() === userID) {
        // Delete user's blurbs first if needed
        await Blurbs.deleteMany({ blurbAuthor: context.user._id });

        // Now delete the user
        await User.findByIdAndDelete(userID);

        return "User deleted successfully.";
      } else {
        throw new Error("User not found"); // Handle the case when the user doesn't exist.
      }
    },
    // ✅

    removeBlurb: async (parent, { blurbID }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw Error("You must be logged in to do this!");
      }
      // Find the blurb to verify the logged-in user is the author
      const blurb = await Blurbs.findById(blurbID);

      if (!blurb) {
        throw new Error("Blurb not found");
      }
      if (blurb.blurbAuthor.toString() !== context.user._id.toString()) {
        throw Error("You are not authorized to delete this blurb");
      }
      // Delete the blurb
      await Blurbs.findOneAndDelete({ _id: blurbID });
      // Remove the blurb from the user’s blurbs array
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { blurbs: blurbID } }
      );
      return "Blurb successfully deleted!";
    },
    // ✅

    removeComment: async (parent, { blurbID, commentID }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw Error("You must be logged in to do this!");
      }

      // Find the blurb to get access to the comments
      const blurb = await Blurbs.findById(blurbID);
      if (!blurb) {
        throw new Error("Blurb not found");
      }

      // Find the comment to verify the logged-in user is the author
      const comment = blurb.comments.id(commentID);
      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.commentAuthor.toString() !== context.user._id.toString()) {
        throw Error("You are not authorized to delete this blurb");
      }

      // Remove the comment from the blurb
      await Blurbs.findOneAndUpdate(
        { _id: blurbID },
        { $pull: { comments: { _id: commentID } } }
      );

      return "Comment successfully deleted!";
    },
    // ✅

    addLike: async (parent, { blurbID }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to like a blurb");
      }

      const updatedBlurb = await Blurbs.findByIdAndUpdate(
        blurbID,
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!updatedBlurb) {
        throw new Error("Blurb not found!");
      }
      return "You have liked the blurb!";
    },
    // ✅

    removeLike: async (parent, { blurbID }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to like or unlike a blurb");
      }

      const updatedBlurb = await Blurbs.findByIdAndUpdate(
        blurbID,
        { $inc: { likes: -1 } },
        { new: true }
      );
      if (!updatedBlurb) {
        throw new Error("Blurb not found!");
      }
      return "You have unliked the blurb!";
    },
    // ✅

    editBlurb: async (parent, { blurbID, blurbText }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw Error("You need to be logged in to edit a blurb");
      }

      // Find the blurb by ID
      const blurb = await Blurbs.findById(blurbID);

      // Check if the blurb exists
      if (!blurb) {
        throw new Error("Blurb not found");
      }

      // Check if the user is authorized to edit the blurb
      if (blurb.blurbAuthor.toString() !== context.user._id.toString()) {
        throw new Error("You can only edit your own blurbs");
      }

      // Update the blurb's text and updatedAt field
      blurb.blurbText = blurbText;
      blurb.updatedAt = Date.now();

      // Save the updated blurb to the database
      await blurb.save();

      // Return a success message
      return "It Worked";
    },
    // ✅

    editUser: async (_, { profileInput }, context) => {
      if (!context.user) {
        throw Error("Not logged in");
      }

      const user = await User.findById(context.user._id);
      if (!user) {
        throw Error("User not found");
      }

      // Update user fields here
      if (profileInput.password) {
        user.profile.password = profileInput.password;
        user.profile.isPasswordChanged = true;
      }

      // Update other profile fields
      if (profileInput.email) user.profile.email = profileInput.email;
      // Repeat for other fields...

      await user.save();
      return user;
    },
  },
};
module.exports = resolvers;

//like a comment
//unlike a comment
