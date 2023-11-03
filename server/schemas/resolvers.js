const { User, Blurbs } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      try {
        // Removed populate blurbs because user search shouldn't return all users and all blurbs - get all blurbs will include the blurbAuthor so it's redundant
        return User.find();
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while searching for users");
      }
    },
    // ✅

    // Find single user by username
    user: async (parent, { username }) => {
      try {
        return User.findOne({ username: username }).populate("blurbs");
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while searching for this user");
      }
    },
    // ✅

    // get blurb from username
    userBlurbs: async (parent, { username }) => {
      try {
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
          .populate('tags')
          .populate({
            path: "comments",
            populate: {
              path: "commentAuthor",
              model: "User",
            },
          });
      }
      return [];
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while searching for blurbs");
      }
    },
    // ✅

    // get all blurbs and comments for each
    blurbs: async () => {
      try {
        return Blurbs.find()
          .populate("blurbAuthor")
          .sort({ createdAt: -1 })
          .populate('tags')
          .populate({
            path: "comments",
            populate: {
              path: "commentAuthor",
              model: "User",
            },
          });
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while searching for blurbs");
      }
    },
    // ✅

    blurbsByTag: async (parent, { tags }) => {
      try {
        // Return blurbs where the search tag is included in the blurb's tags array
        return Blurbs.find({ tags: { $in: tags } });
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while searching for blurbs");
      }
    },
    // ✅

    // Get all users with blurbs greater than zero
    randomBlurb: async() => {
      try {
        const loginRandomBlurbs = await User.find({
          $where: 'this.blurbs.length > 0'
        }).populate({
          path: 'blurbs',
          populate: {
            path: 'blurbAuthor'
          }
        })
        const blurbs = [] 
        for (const user of loginRandomBlurbs) {
          
          blurbs.push(...user.blurbs)
        }
        const randomIndex = Math.floor(Math.random() * blurbs.length)
        console.log(blurbs[randomIndex])
        return blurbs[randomIndex]
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while searching for a blurb");
      }
    },
     // ✅

    // Find my user account
    me: async (parent, args, context) => {
      try {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate("blurbs");
        }
        throw AuthenticationError("You need to be logged in!");
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while finding your account");
      }
    },
    // ✅
  },

  Mutation: {
    addUser: async (parent, { username, profile }) => {
      console.log("Attempting to add user");
      try {
        const user = await User.create({ username, profile });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add user");
      }
    },
    // ✅

    login: async (parent, { email, password, profile }) => {
      try {
        // Query User model to find user with provided email within profile subdoc
        const user = await User.findOne({ "profile.email": email });

        // If no user found with provided email, throw new error
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Use isCorrectPassword method within profile subdoc to compare the provided password with stored hashed password
        const correctPw = await user.isCorrectPassword(password);

        // If password is incorrect, throw new error
        if (!correctPw) {
          throw new Error("Invalid email or password");
        }

        // Generate token for the authenticated user
        const token = signToken(user);

        // Return generated token and user object
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error("Login failed");
      }
    },
    // ✅

    addBlurb: async (parent, { blurbText, tags }, context) => {
      if (context.user) {
          try {
          // Create a new blurb using the Blurb model
          const blurb = await Blurbs.create({
            blurbText,
            // Use the user's ID as the blurbAuthor
            blurbAuthor: context.user._id, 
            tags,
          });
          // Update the user's blurbs array with the new blurb's ID
          await User.findByIdAndUpdate(context.user._id, {
            $addToSet: { blurbs: blurb._id },
          });
          return blurb;
          } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating your blurb");
          }
        } else {
          throw new Error("You need to be logged in to create a blurb!");
        }
    },
    // ✅

    addComment: async (parent, { blurbID, commentText }, context) => {
      // Verify user is logged in
      if (!context.user) {
        console.error(error);
        throw new Error("You must be logged in to do this!");
      }

      try {
        // Find and update the "Blurbs" document with the given "blurbID."
        const updatedBlurb = await Blurbs.findOneAndUpdate(
          { _id: blurbID },
          {
            // Use $push to add new comment object to the "comments" array.
            $push: {
              comments: {
                commentText,
                commentAuthor: context.user._id, 
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (updatedBlurb) {
          // If "updatedBlurb" document exists, find the new comment in "comments" array.
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
        throw new Error("Failed to create comment.");
      } catch (error) {
        // Handle any errors that occur during the process and throw a generic error message.
        console.error(error);
        throw new Error("An error occurred while creating your comment.");
      }
    },
    // ✅

    deleteUser: async (parent, { userID }, context) => {
      if (context.user && context.user._id.toString() === userID) {
        try {
          // Delete user's blurbs first if needed
          await Blurbs.deleteMany({ blurbAuthor: context.user._id });

          // Now delete the user
          await User.findByIdAndDelete(userID);

          return "User deleted successfully.";
        } catch (error) {
          console.error(error);
          throw new Error("An error occurred while deleting your user profile")
        }
      } else {
        throw new Error("User not found"); // Handle the case when the user doesn't exist.
      }
    },
    // ✅

    removeBlurb: async (parent, { blurbID }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to do this!");
      }

      try {
        // Find the blurb to verify the logged-in user is the author
        const blurb = await Blurbs.findById(blurbID);

        if (!blurb) {
          throw new Error("Blurb not found");
        }
        if (blurb.blurbAuthor.toString() !== context.user._id.toString()) {
          throw new Error("You are not authorized to delete this blurb");
        }
        // Delete the blurb
        await Blurbs.findOneAndDelete({ _id: blurbID });
        // Remove the blurb from the user’s blurbs array
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { blurbs: blurbID } }
        );
        return "Blurb successfully deleted!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to remove blurb")
      }
    },
    // ✅

    removeComment: async (parent, { blurbID, commentID }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to do this!");
      }

      try {
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
          throw new Error("You are not authorized to delete this blurb");
        }

        // Remove the comment from the blurb
        await Blurbs.findOneAndUpdate(
          { _id: blurbID },
          { $pull: { comments: { _id: commentID } } }
        );

        return "Comment successfully deleted!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete comment")
      }
    },
    // ✅

    addLike: async (parent, { blurbID }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to like a blurb");
      }
      
      try {
        const updatedBlurb = await Blurbs.findByIdAndUpdate(
          blurbID,
          { $inc: { likes: 1 } },
          { new: true }
        );
        if (!updatedBlurb) {
          throw new Error("Blurb not found!");
        }
        return "You have liked the blurb!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to like blurb")
      }
    },
    // ✅

    removeLike: async (parent, { blurbID }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to like or unlike a blurb");
      }

      try {
        const updatedBlurb = await Blurbs.findByIdAndUpdate(
          blurbID,
          { $inc: { likes: -1 } },
          { new: true }
        );
        if (!updatedBlurb) {
          throw new Error("Blurb not found!");
        }
        return "You have unliked the blurb!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to remove like from blurb")
      }
    },
    // ✅

    editBlurb: async (parent, { blurbID, blurbText, tags }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You need to be logged in to edit a blurb");
      }
      
      try {
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

        // Update the blurb's text, updatedAt, and tags fields
        blurb.blurbText = blurbText;
        blurb.updatedAt = Date.now();
        blurb.tags = tags;

        // Save the updated blurb to the database
        await blurb.save();

        // Return a success message
        return "It Worked";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to edit your blurb")
      }
    },
    // ✅

    editUser: async (_, { profile, username }, context) => {
      if (!context.user) {
        throw new Error("Not logged in");
      }
      
      try {
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error("User not found");
        }

        // Update user fields here

        if (user.profile.password) {
          user.profile.password = profile.password;
          user.profile.isPasswordChanged = true;
        }

        // Update other profile fields
        if (profile.email) user.profile.email = profile.email;
        // Repeat for other fields...
        if (username) user.username = username;
        if (profile.bio) user.profile.bio = profile.bio;
        if (profile.fullName) user.profile.fullName = profile.fullName;
        if (profile.location) user.profile.location = profile.location;
        if (profile.profilePic) user.profile.profilePic = profile.profilePic;
        console.log(user);
        await user.save();
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to edit your information");
      }
    },
    // ✅

    editComment: async (_, { blurbID, commentID, newCommentText }, context) => {
      // Check if a user is authenticated in the current context
      if (!context.user) {
        // If not authenticated, throw an error
        throw new Error("You need to be logged in to edit a comment");
      }

      try {
        // Find the blurb by ID and update the comment
        const updatedComment = await Blurbs.findByIdAndUpdate(
          blurbID,
          {
            $set: {
              // Update the comment text with the new text
              "comments.$[comment].commentText": newCommentText,
              // Update the timestamp of the comment
              "comments.$[comment].updatedAt": new Date(),
            },
          },
          {
            new: true, // Return the updated document
            arrayFilters: [{ "comment._id": commentID }], // Filter comments by their IDs
          }
        );

        // Log the updated comment to the console for debugging
        console.log(updatedComment);

        // Check if the comment was not found or could not be updated
        if (!updatedComment) {
          // If not found or could not be updated, throw an error
          throw new Error("Comment not found or could not be updated");
        }

        // Return a success message
        return "It worked!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to edit your comment")
      }
    },

    addCommentLike: async (parent, { blurbID, commentID }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to like a comment");
      }

      try {
        //find blurb if it exists
        const blurb = await Blurbs.findById(blurbID);
        if (!blurb) {
          throw new Error("Blurb not found");
        }

        const comment = blurb.comments.id(commentID);
        if (!comment) {
          throw new Error("Comment not found");
        }

        // Increment the 'likes' field of the comment
        comment.likes += 1;

        await blurb.save();

        return "You have liked the comment!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to like comment")
      }
    },

    removeCommentLike: async (parent, { blurbID, commentID }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to like a comment");
      }

      try {
        // Find blurb if it exists
        const blurb = await Blurbs.findById(blurbID);
        if (!blurb) {
          throw new Error("Blurb not found");
        }

        const comment = blurb.comments.id(commentID);
        if (!comment) {
          throw new Error("Comment not found");
        }

        // Increment the 'likes' field of the comment
        comment.likes += -1;

        await blurb.save();

        return "You have unliked the comment!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to remove like from comment");
      }
    },
  },
};
module.exports = resolvers;
