const { User, Blurbs } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      try {
        // Removed populate blurbs because user search shouldn't return all users and all blurbs - get all blurbs will include the blurbAuthor so it's redundant
        return User.find()
          .populate("blurbs")
          .populate({
            path: "followers",
            model: "User",
          })
          .populate({
            path: "following",
            model: "User",
          });
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while searching for users");
      }
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
          .populate("tags")
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
        .populate("tags")
        .populate({
          path: "comments",
          populate: {
            path: "commentAuthor",
            model: "User",
          },
        });
    },
    // ✅

    blurbsByTag: async (parent, { tags }) => {
      return Blurbs.find({ tags: tags });
    },
    // ✅

    //get all users with blurbs greater than zero
    randomBlurb: async () => {
      const loginRandomBlurbs = await User.find({
        $where: "this.blurbs.length > 0",
      }).populate({
        path: "blurbs",
        populate: {
          path: "blurbAuthor",
        },
      });
      const blurbs = [];
      for (const user of loginRandomBlurbs) {
        blurbs.push(...user.blurbs);
      }
      const randomIndex = Math.floor(Math.random() * blurbs.length);
      // console.log(blurbs[randomIndex])
      return blurbs[randomIndex];
    },

    // find my user account
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("blurbs");
      }
      throw AuthenticationError;
    },
    // ✅

    following: async (parent, args, context) => {
      // if (!context.user) {
      //   throw new Error("You must be logged in to view followers!");
      // }
      console.log("context");

      try {
        // Find myself and populate the following array
        const user = await User.findById(context.user._id).populate(
          "following"
        );
        console.log(user);
        if (!user) {
          throw new Error("User not found");
        }

        // Return the list of users I follow
        return user.following;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to find followers");
      }
    },

    followers: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to view followers!");
      }

      try {
        // Find myself and populate the followers array
        const user = await User.findById(context.user._id).populate(
          "followers"
        );
        if (!user) {
          throw new Error("User not found");
        }

        console.log("----------");
        console.log(user.followers);
        // Return the list of users who follow me
        return user.followers;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to find followers");
      }
    },
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

    login: async (parent, { email, password, profile }) => {
      // Query the User model to find a user with the provided email within the profile subdocument
      const user = await User.findOne({ "profile.email": email });

      // If no user is found with the provided email, throw an AuthenticationError
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Use the isCorrectPassword method within the profile subdocument to compare the provided password with the stored hashed password
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new Error("Invalid email or password");
      }

      // Generate a token for the authenticated user
      const token = signToken(user);

      // Return the generated token and the user object
      return { token, user };
    },
    // ✅

    addBlurb: async (parent, { blurbText, tags, blurbId }, context) => {
      if (context.user) {
        // Create a new blurb using the Blurb model
        const blurb = await Blurbs.create({
          blurbText,
          blurbAuthor: context.user._id, // Use the user's ID as the blurbAuthor
          tags,
        });
        // Update the user's blurbs array with the new blurb's ID
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { blurbs: blurb._id },
        });
        return "Successfully added Blurb";
      } else {
        throw new Error("You need to be logged in to create a blurb!");
      }
    },
    // ✅

    addComment: async (parent, { blurbId, commentText }, context) => {
      if (context.user) {
        try {
          // Attempt to find and update the "Blurbs" document with the given "blurbId."
          const updatedBlurb = await Blurbs.findOneAndUpdate(
            { _id: blurbId },
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
          throw new Error("Failed to create comment.");
        } catch (error) {
          // Handle any errors that occur during the process and throw a generic error message.
          throw new Error("An error occurred while creating the comment.");
        }
      } else {
        // If the user is not authenticated, throw an "AuthenticationError" with a specific message.
        throw new Error("You need to be logged in to comment!");
      }
    },
    // ✅

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

    removeBlurb: async (parent, { blurbId }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to do this!");
      }
      // Find the blurb to verify the logged-in user is the author
      const blurb = await Blurbs.findById(blurbId);

      if (!blurb) {
        throw new Error("Blurb not found");
      }
      if (blurb.blurbAuthor.toString() !== context.user._id.toString()) {
        throw new Error("You are not authorized to delete this blurb");
      }
      // Delete the blurb
      await Blurbs.findOneAndDelete({ _id: blurbId });
      // Remove the blurb from the user’s blurbs array
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { blurbs: blurbId } }
      );
      return "Blurb successfully deleted!";
    },
    // ✅

    removeComment: async (parent, { blurbId, commentId }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to do this!");
      }

      // Find the blurb to get access to the comments
      const blurb = await Blurbs.findById(blurbId);
      if (!blurb) {
        throw new Error("Blurb not found");
      }

      // Find the comment to verify the logged-in user is the author
      const comment = blurb.comments.id(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.commentAuthor.toString() !== context.user._id.toString()) {
        throw new Error("You are not authorized to delete this blurb");
      }

      // Remove the comment from the blurb
      await Blurbs.findOneAndUpdate(
        { _id: blurbId },
        { $pull: { comments: { _id: commentId } } }
      );

      return "Comment successfully deleted!";
    },
    // ✅

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
      return "You have liked the blurb!";
    },
    // ✅

    removeLike: async (parent, { blurbId }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to like or unlike a blurb");
      }

      const updatedBlurb = await Blurbs.findByIdAndUpdate(
        blurbId,
        { $inc: { likes: -1 } },
        { new: true }
      );
      if (!updatedBlurb) {
        throw new Error("Blurb not found!");
      }
      return "You have unliked the blurb!";
    },
    // ✅

    editBlurb: async (parent, { blurbId, blurbText, tags }, context) => {
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You need to be logged in to edit a blurb");
      }

      // Find the blurb by ID
      const blurb = await Blurbs.findById(blurbId);

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
      blurb.new = true;

      // Save the updated blurb to the database
      await blurb.save();

      // Return a success message
      return "It Worked";
    },
    // ✅

    editUser: async (_, { profile, username }, context) => {
      if (!context.user) {
        throw new Error("Not logged in");
      }

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
    },
    // ✅

    editAccount: async (_, { profile}, context) => {
      if (!context.user) {
        throw new Error("Not logged in");
      }

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
      
      console.log(user);
      await user.save();
      return user;
    },
    // ✅




    editComment: async (_, { blurbId, commentId, newCommentText }, context) => {
      console.log(newCommentText);
      // Check if a user is authenticated in the current context
      if (!context.user) {
        // If not authenticated, throw an error
        throw new Error("You need to be logged in to edit a comment");
      }

      // Find the blurb by ID and update the comment
      const updatedComment = await Blurbs.findByIdAndUpdate(
        blurbId,
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
          arrayFilters: [{ "comment._id": commentId }], // Filter comments by their IDs
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
    },

    addCommentLike: async (parent, { blurbId, commentId }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to like a comment");
      }

      //find blurb if it exists
      const blurb = await Blurbs.findById(blurbId);
      if (!blurb) {
        throw new Error("Blurb not found");
      }

      const comment = blurb.comments.id(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }

      // Increment the 'likes' field of the comment
      comment.likes += 1;

      await blurb.save();

      return "You have liked the comment!";
    },

    removeCommentLike: async (parent, { blurbId, commentId }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to like a comment");
      }

      //find blurb if it exists
      const blurb = await Blurbs.findById(blurbId);
      if (!blurb) {
        throw new Error("Blurb not found");
      }

      const comment = blurb.comments.id(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }

      // Increment the 'likes' field of the comment
      comment.likes += -1;

      await blurb.save();

      return "You have unliked the comment!";
    },

    followUser: async (parent, { userIdToFollow }, context) => {
      console.log(context.user);
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to follow users");
      }

      try {
        const userToFollow = await User.findById(userIdToFollow);

        if (!userToFollow) {
          throw new Error("Failed to find user");
        }

        if (context.user._id.toString() === userIdToFollow) {
          throw new Error("You cannot follow yourself");
        }

        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { following: userIdToFollow } },
          { new: true }
        );

        await User.findByIdAndUpdate(
          userIdToFollow,
          { $addToSet: { followers: context.user._id } },
          { new: true }
        );

        return "User followed successfully!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to follow user");
      }
    },
  },
};
module.exports = resolvers;
