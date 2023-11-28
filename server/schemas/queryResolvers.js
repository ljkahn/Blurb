// const resolvers = {
//     Query: {
//       //get all users
//       users: async () => {
//         try {
//           return User.find()
//             .populate("blurbs")
//             .populate({
//               path: "followers",
//               model: "User",
//             })
//             .populate({
//               path: "following",
//               model: "User",
//             });
//         } catch (error) {
//           console.error(error);
//           throw new Error("An error occurred while searching for users");
//         }
//       },
//       // ✅

//       // Find single user by username
//       user: async (parent, { username }) => {
//         try {
//           return User.findOne({ username: username })
//             .populate("blurbs")
//             .populate("notifications")
//             .populate({
//               path: "notifications",
//               populate: {
//                 path: "sender recipient",
//               },
//             });
//         } catch (error) {
//           console.error(error);
//           throw new Error("Failed to find user");
//         }
//       },
//       // ✅

//       // get blurb from username
//       userBlurbs: async (parent, { username }) => {
//         if (username) {
//           const user = await User.findOne({ username });
//           if (!user) {
//             return [];
//           }
//           const params = username ? { username } : {};

//           // find blurbs by username and populate author and comments
//           return Blurbs.find({ blurbAuthor: user._id })
//             .populate("blurbAuthor")
//             .sort({ createdAt: -1 })
//             .populate("tags")
//             .populate({
//               path: "comments",
//               populate: {
//                 path: "commentAuthor",
//                 model: "User",
//               },
//             });
//         }
//         return [];
//       },
//       // ✅

//       // get all blurbs and comments for each
//       blurbs: async () => {
//         return Blurbs.find()
//           .populate("blurbAuthor")
//           .sort({ createdAt: -1 })
//           .populate("tags")
//           .populate({
//             path: "comments",
//             populate: {
//               path: "commentAuthor",
//               model: "User",
//             },
//           });
//       },
//       // ✅

//       // populate blurbs with a specific tag
//       blurbsByTag: async (parent, { tags }) => {
//         return Blurbs.find({ tags: tags });
//       },
//       // ✅

//       // Find a blurb by its ID
//       findBlurbById: async (parent, { blurbId }) => {
//         return Blurbs.findById(blurbId)
//           .populate("blurbAuthor")
//           .populate({
//             path: "comments",
//             populate: {
//               path: "commentAuthor",
//               model: "User",
//             },
//           });
//       },

//       //get all users with blurbs greater than zero
//       randomBlurb: async () => {
//         // const loginRandomBlurbs = await User.find({
//         //   $where: "this.blurbs.length > 0",
//         // }).populate({
//         //   path: "blurbs",
//         //   populate: {
//         //     path: "blurbAuthor",
//         //   },
//         // });
//         // const blurbs = [];
//         // for (const user of loginRandomBlurbs) {
//         //   blurbs.push(...user.blurbs);
//         // }
//         const blurbs = await Blurbs.find().populate("blurbAuthor");
//         const randomIndex = Math.floor(Math.random() * blurbs.length);
//         console.log(blurbs[randomIndex]);
//         return blurbs[randomIndex];
//       },

//       // find my user account
//       me: async (parent, args, context) => {
//         if (context.user) {
//           const currentUser = await User.findOne({
//             _id: context.user._id,
//           }).populate("blurbs");
//           console.log(currentUser);
//           return currentUser;
//         }
//         throw AuthenticationError;
//       },
//       // ✅

//       notify: async (parent, args, context) => {
//         // Check if the user is authenticated
//         if (!context.user) {
//           throw new Error("Authentication required");
//         }

//         try {
//           // Fetch user data including notifications
//           const user = await User.findById(context.user._id).populate({
//             path: "notifications",
//             populate: {
//               path: "sender recipient",
//               model: "User",
//             },
//           });

//           if (!user) {
//             throw new Error("User not found");
//           }

//           // Return user data with populated notifications
//           return user;
//         } catch (error) {
//           console.error("Error in notify resolver:", error);
//           throw new Error("Failed to fetch notifications");
//         }
//       },

//       following: async (parent, args, context) => {
//         // if (!context.user) {
//         //   throw new Error("You must be logged in to view followers!");
//         // }
//         console.log("context");

//         try {
//           // Find myself and populate the following array
//           const user = await User.findById(context.user._id).populate(
//             "following"
//           );
//           console.log(user);
//           if (!user) {
//             throw new Error("User not found");
//           }

//           // Return the list of users I follow
//           return user.following;
//         } catch (error) {
//           console.error(error);
//           throw new Error("Failed to find followers");
//         }
//       },

//       followers: async (parent, args, context) => {
//         if (!context.user) {
//           throw new Error("You must be logged in to view followers!");
//         }

//         try {
//           // Find myself and populate the followers array
//           const user = await User.findById(context.user._id).populate(
//             "followers"
//           );
//           if (!user) {
//             throw new Error("User not found");
//           }

//           // Return the list of users who follow me
//           return user.followers;
//         } catch (error) {
//           console.error(error);
//           throw new Error("Failed to find followers");
//         }
//       },

//       followedUsersBlurbs: async (parent, args, context) => {
//         if (!context.user) {
//           throw new Error("You must be logged in to view this content");
//         }

//         try {
//           // Fetch the list of users that the current user is following
//           const currentUser = await User.findById(context.user._id).populate(
//             "following"
//           );

//           // Extract the IDs of followed users
//           const followedUserIds = currentUser.following.map((user) => user._id);

//           // Find blurbs where the author is in the list of followed users
//           const blurbs = await Blurbs.find({
//             blurbAuthor: { $in: followedUserIds },
//           })
//             .populate("blurbAuthor")
//             .sort({ createdAt: -1 })
//             .populate("tags")
//             .populate({
//               path: "comments",
//               populate: {
//                 path: "commentAuthor",
//                 model: "User",
//               },
//             });

//           const loggedInUserBlurbs = await Blurbs.find({
//             blurbAuthor: context.user._id,
//           }).populate("blurbAuthor");

//           return [...loggedInUserBlurbs, ...blurbs];
//         } catch (error) {
//           console.error(error);
//           throw new Error("An error occurred while retrieving blurbs");
//         }
//       },

//       // userFollowers: async (parent, { userId }, context) => {
//       //   try {
//       //     // Fetch the user based on the provided userId and populate the followers field
//       //     const user = await User.findById(userId).populate('followers');
//       //     console.log('Populated User:', user);

//       userFollowers: async (parent, { userId }, context) => {
//         try {
//           // Fetch the user based on the provided userId and populate the followers field
//           const user = await User.findById(userId).populate("followers");

//           console.log("Fetched User:", user);

//           if (!user) {
//             throw new Error("User not found");
//           }

//           // Return the list of followers
//           return user.followers;
//         } catch (error) {
//           console.error(error);
//           throw new Error("Failed to fetch user followers");
//         }
//       },

//       userFollowing: async (parent, { userId }, context) => {
//         try {
//           // Fetch the user based on the provided userId and populate the followers field
//           const user = await User.findById(userId).populate("following");

//           console.log("Fetched User:", user);

//           if (!user) {
//             throw new Error("User not found");
//           }

//           // Return the list of followers
//           return user.following;
//         } catch (error) {
//           console.error(error);
//           throw new Error("Failed to fetch user following");
//         }
//       },

//       // passwordReset: async (_, { token, email }) => {
//       //   console.log(token);
//       //   try {
//       //     const currentProfile = Profile.findOne({ email: email });
//       //     if (currentProfile) {
//       //       resetPasswordToken({email, token})
//       //       return true
//       //     }
//       //     return false
//       //   } catch (error) {
//       //     console.error(error);
//       //     throw new Error("Failed to find email.");
//       //   }
//       // },
//     },
