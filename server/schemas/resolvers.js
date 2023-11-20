
const { User, Blurbs, Notification } = require("../models");
const {
  signToken,
  AuthenticationError,
  resetPasswordToken,
} = require("../utils/auth");


// const sendNotification = require("../utils/sendNotification");

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      try {
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

    // Find single user by username
    user: async (parent, { username }) => {
      try {
        return User.findOne({ username: username })
          .populate("blurbs")
          .populate("notifications")
          .populate({
            path: 'notifications',
            populate: {
              path: 'sender recipient'
            }
          });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to find user");
      }
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

    // populate blurbs with a specific tag
    blurbsByTag: async (parent, { tags }) => {
      return Blurbs.find({ tags: tags });
    },
    // ✅

    // Find a blurb by its ID
    findBlurbById: async (parent, { blurbId }) => {
      return Blurbs.findById(blurbId)
        .populate("blurbAuthor")
        .populate({
          path: "comments",
          populate: {
            path: "commentAuthor",
            model: "User",
          },
        });
    },

    //get all users with blurbs greater than zero
    randomBlurb: async () => {
      // const loginRandomBlurbs = await User.find({
      //   $where: "this.blurbs.length > 0",
      // }).populate({
      //   path: "blurbs",
      //   populate: {
      //     path: "blurbAuthor",
      //   },
      // });
      // const blurbs = [];
      // for (const user of loginRandomBlurbs) {
      //   blurbs.push(...user.blurbs);
      // }
      const blurbs = await Blurbs.find().populate("blurbAuthor");
      const randomIndex = Math.floor(Math.random() * blurbs.length);
      console.log(blurbs[randomIndex]);
      return blurbs[randomIndex];
    },

    // find my user account
    me: async (parent, args, context) => {
      if (context.user) {
        const currentUser = await User.findOne({
          _id: context.user._id,
        }).populate("blurbs");
        console.log(currentUser);
        return currentUser;
      }
      throw AuthenticationError;
    },
    // ✅
    
    notify: async (parent, args, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new Error("Authentication required");
      }

      try {
        // Fetch user data including notifications
        const user = await User.findById(context.user._id)
          .populate({
            path: 'notifications',
            populate: { 
              path: 'sender recipient', 
              model: 'User' 
            }
          });

        if (!user) {
          throw new Error("User not found");
        }

        // Return user data with populated notifications
        return user;
      } catch (error) {
        console.error("Error in notify resolver:", error);
        throw new Error("Failed to fetch notifications");
      }
    },

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

        // Return the list of users who follow me
        return user.followers;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to find followers");
      }
    },

    followedUsersBlurbs: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You must be logged in to view this content");
      }

      try {
        // Fetch the list of users that the current user is following
        const currentUser = await User.findById(context.user._id).populate(
          "following"
        );

        // Extract the IDs of followed users
        const followedUserIds = currentUser.following.map((user) => user._id);

        
        // Find blurbs where the author is in the list of followed users
        const blurbs = await Blurbs.find({
          blurbAuthor: { $in: followedUserIds },
        })
        .populate("blurbAuthor")
        .sort({ createdAt: -1 })
        .populate("tags")
        .populate({
          path: "comments",
          populate: {
            path: "commentAuthor",
            model: "User",
          }
          });

          const loggedInUserBlurbs = await Blurbs.find({blurbAuthor: context.user._id});

        return [...loggedInUserBlurbs, ...blurbs];
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while retrieving blurbs");
      }
    },

    userFollowers: async (_, { userId }, context) => {
      // Check authentication and permissions as needed

      try {
        // Fetch the user based on the provided userId
        const user = await User.findById(userId).populate("followers");

        if (!user) {
          throw new Error("User not found");
        }

        // Return the list of users that the user follows
        return user.followers;
      } catch (error) {
        console.error("Error fetching user followers:", error);
        throw new Error("Failed to fetch user followers");
      }
    },

    // passwordReset: async (_, { token, email }) => {
    //   console.log(token);
    //   try {
    //     const currentProfile = Profile.findOne({ email: email });
    //     if (currentProfile) {
    //       resetPasswordToken({email, token})
    //       return true
    //     }
    //     return false
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error("Failed to find email.");
    //   }
    // },

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
              const blurb = await Blurbs.findById(blurbId);
              if (
                blurb &&
                blurb.blurbAuthor.toString() !== context.user._id.toString()
              ) {
                const blurbAuthor = await User.findById(blurb.blurbAuthor);
                await context.user.sendNotification({
                  recipient: blurbAuthor.username,
                  type: "comment",
                });
              }
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
      // Verify if the user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to like a blurb");
      }

      try {
        // Find the blurb and update its like list
        const updatedBlurb = await Blurbs.findByIdAndUpdate(
          blurbId,
          { $push: { likeList: context.user._id } },
          { new: true }
        ).populate("blurbAuthor");

        if (!updatedBlurb) {
          throw new Error("Blurb not found");
        }

        // Prevent users from sending notifications to themselves
        if (updatedBlurb.blurbAuthor._id.toString() !== context.user._id.toString()) {
          // Find the author of the blurb
          const blurbAuthor = await User.findOne({username: updatedBlurb.blurbAuthor.username});

          // Send a notification to the blurb author
          if (blurbAuthor) {
            await blurbAuthor.sendNotification({
              recipient: blurbAuthor,
              type: "like",
              sender: context.user,
              blurbId: blurbId,
            });
          }
        }

        return "You have liked the blurb!";
      } catch (error) {
        console.error("Error in addLike mutation: ", error);
        throw new Error("Error while liking the blurb");
      }
    },

    removeLike: async (parent, { blurbId }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to like or unlike a blurb");
      }

      const updatedBlurb = await Blurbs.findByIdAndUpdate(
        blurbId,
        { $pull: { likeList: context.user._id } },
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

    // editAccount: async (_, { password, email }, context) => {
    //   if (!context.user) {
    //     throw new Error("Not logged in");
    //   }

    //   const user = await User.findById(context.user._id);
    //   if (!user) {
    //     throw new Error("User not found");
    //   }

    //   // Update user fields here

    //   if (password) {
    //     user.profile.password = password;
    //     user.profile.isPasswordChanged = true;
    //   }

    //   // Update other profile fields
    //   if (email) user.profile.email = email;
    //   // Repeat for other fields...

    //   console.log(user);
    //   await user.save();
    //   return user;
    // },
    // // ✅

    editAccount: async (_, { email, password }, context) => {
      if (!context.user) {
        throw new Error("Not logged in");
      }

      const user = await User.findById(context.user._id);
      if (!user) {
        throw new Error("User not found");
      }

      // Update user fields here

      if (user.profile.password) {
        user.profile.password = password;
        user.profile.isPasswordChanged = true;
      }

      // Update other profile fields
      if (email) user.profile.email = email;
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
          $push: {
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

      try {
        //find blurb if it exists
        const blurb = await Blurbs.findById(blurbId);
        if (!blurb) {
          throw new Error("Blurb not found");
        }
  
        const comment = blurb.comments.id(commentId);
        if (!comment) {
          throw new Error("Comment not found");
        }

        const commentUser = await User.findById(comment.commentAuthor)
  
        // If the id doesn't exist in like list, push id to like list
        if (!comment.likeList.includes(context.user._id)) {
          comment.likeList.push(context.user._id);

          // Add comment notification but blurbId is going to have the value of commentId
          // Haven't had a chance to look through this yet but I can fix typedef and model to 
          // make sure that they are correctly labeled as commentId
          // "liked comment" does show up with correct sender, receiver, and commentId though
          if (commentUser) {
            await commentUser.sendNotification({
              recipient: commentUser,
              type: "liked comment",
              sender: context.user,
              blurbId: commentId,
            });
        }
        
        await blurb.save();
        }
  
        return "You have liked the comment!";
      } catch (error) {
        console.error("Error in addCommentLike mutation: ", error);
        throw new Error("Error while liking the comment");
      }

    },

    // if (!context.user) {
    //   throw new Error("You must be logged in to like a blurb");
    // }

    // try {
    //   // Find the blurb and update its like list
    //   const updatedBlurb = await Blurbs.findByIdAndUpdate(
    //     blurbId,
    //     { $push: { likeList: context.user._id } },
    //     { new: true }
    //   ).populate("blurbAuthor");

    //   if (!updatedBlurb) {
    //     throw new Error("Blurb not found");
    //   }

    //   // Prevent users from sending notifications to themselves
    //   if (updatedBlurb.blurbAuthor._id.toString() !== context.user._id.toString()) {
    //     // Find the author of the blurb
    //     const blurbAuthor = await User.findOne({username: updatedBlurb.blurbAuthor.username});

    //     // Send a notification to the blurb author
    //     if (blurbAuthor) {
    //       await blurbAuthor.sendNotification({
    //         recipient: blurbAuthor,
    //         type: "like",
    //         sender: context.user,
    //         blurbId: blurbId,
    //       });
    //     }
    //   }

    //   return "You have liked the blurb!";
    // } catch (error) {
    //   console.error("Error in addLike mutation: ", error);
    //   throw new Error("Error while liking the blurb");
    // }

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
      console.log(comment);
      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.likeList.includes(context.user._id)) {
        // Remove the user's ID from the likeList
        // comment.likeList = comment.likeList.filter(id => id !== context.user._id);
        comment.likeList.pull(context.user._id);

        // Save the updated blurb
        await blurb.save();

        return "You have unliked the comment!";
      } else {
        throw new Error("You haven't liked this comment");
      }
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

        await userIdToFollow.sendNotification({
          recipient: userToFollow,
          type: "follow",
        });

        return "User followed successfully!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to follow user");
      }
    },

    unfollowUser: async (parent, { userIdToUnfollow }, context) => {
      console.log(context.user);
      // Verify user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to follow users");
      }

      try {
        const userToUnfollow = await User.findById(userIdToUnfollow);

        if (!userToUnfollow) {
          throw new Error("Failed to find user");
        }

        if (context.user._id.toString() === userIdToUnfollow) {
          throw new Error("You cannot follow yourself");
        }

        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { following: userIdToUnfollow } },
          { new: true }
        );

        await User.findByIdAndUpdate(
          userIdToUnfollow,
          { $pull: { followers: context.user._id } },
          { new: true }
        );

        return "User unfollowed successfully!";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to unfollow user");
      }
    },

    resetPassword: async (_, { token, newPassword }, { data }) => {
      try {
        // Find the user by email and check if the reset token matches
        console.log(data);

        // if (body.variables.token === token) {
        //   //update the password to the new password
        // }
        return "Password has been reset!";

        // const user = await User.findOne({
        //   "profile.email": email,
        //   resetToken: token,
        // });
        // if (!user) {
        //   throw new Error("User not found or invalid token");
        // }

        // // Update the user's password and clear the reset token
        // user.profile.password = newPassword;
        // user.resetToken = undefined;
        // await user.save();

        // // Generate a new token for the authenticated user
        // const newToken = signToken(user);

        // return { token: newToken, user };
      } catch (error) {
        console.error("Error resetting password:", error);
        throw new Error("Failed to reset password");
      }
    },

    passwordReset: async (_, { token, email }) => {
      console.log(token);
      try {
        const currentProfile = User.findOne({ "profile.email": email });
        if (currentProfile) {
          resetPasswordToken({ email, token });
          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to find email.");
      }
    },
  },
};
module.exports = resolvers;
