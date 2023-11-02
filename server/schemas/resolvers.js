const { User, Blurbs } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      return User.find().populate("blurbs");
    },
    // ✅

    // Find single user by username( and populate blurbs or just get user???)
    user: async (parent, { username }) => {
      return User.findOne({ username: username }).populate('blurbs'); //.populate('blurbs')???
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
            path: 'comments',
            populate: {
                path: 'commentAuthor',
                model: 'User'
            }
            });
        }
        return [];
    },
    // ✅

    // get all blurbs and comments for each
    blurbs: async () => {
      return Blurbs.find().populate("blurbAuthor")
      .sort({ createdAt: -1 })
        .populate({
            path: 'comments',
            populate: {
                path: 'commentAuthor',
                model: 'User'
            }
        });
    },
    // ✅

    // find my user account
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('blurbs');
      }
      throw AuthenticationError('You need to be logged in!');
    },
    // ✅
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
      const correctPw = await user.isCorrectPassword(password);

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
        throw new AuthenticationError(
          "You need to be logged in to create a blurb!"
        );
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
          throw new Error("Failed to create comment.");
        } catch (error) {
          // Handle any errors that occur during the process and throw a generic error message.
          throw new Error("An error occurred while creating the comment.");
        }
      } else {
        // If the user is not authenticated, throw an "AuthenticationError" with a specific message.
        throw new AuthenticationError("You need to be logged in to comment!");
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

    // 
    removeBlurb: async (parent, { blurbId, blurbAuthor }, context) => {
      // Verify user is logged in and they're the author of the blurb
      if (context.user) {
        const blurb = await Blurbs.findOneAndDelete({
          _id: blurbId,
          blurbAuthor: context.user._id,
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


    editUser: async (_, { profileInput }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }
  
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found');
        }
        console.log(user);
  
        // Update user fields here
        if (profileInput.password) {
          user.profile.password = profileInput.password;
          user.profile.isPasswordChanged = true;
        }
        
        // Update other profile fields
        if (user.username) {
            user.username = user.username;
        }
        if (profileInput.email) {
            user.profile.email = profileInput.email;
        }
        if (profileInput.bio) {
            user.profile.bio = profileInput.bio;
        }
        if (profileInput.fullName) {
            user.profile.fullName = profileInput.fullName;
        }
        if (profileInput.location) {
            user.profile.location = profileInput.location;
        }
        if (profileInput.profilePic) {
            user.profile.profilePic = profileInput.profilePic;
        }
        // Repeat for other fields...
  
        await user.save();
        return user;
      },
    },
  };
module.exports = resolvers;
