const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    match: [
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
      "Minimum 8 characters, must include lowercase, uppercase, number, and special character",
    ],
  },
  profilePic: {
    type: String,
    default: "", // ADD in a default pic
  },
  bio: {
    type: String,
    maxLength: 255,
  },
  location: {
    type: String,
    required: false,
  },
  isPasswordChanged: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Add the resetToken field
    resetToken: {
      type: String,
    },

    // Optional: Add a field for token expiration (if you have token expiration logic)
    // resetTokenExpires: {
    //   type: Date,
    // },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blurbs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blurbs",
      },
    ],
    profile: profileSchema,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Clear the isPasswordChanged flag to prevent it from affecting future saves
  this.isPasswordChanged = false;

  next();
});

userSchema.virtual("followerNumber").get(function () {
  return this.followers.length;
});

userSchema.virtual("followingNumber").get(function () {
  return this.following.length;
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.profile.password);
};

const User = model("User", userSchema);

module.exports = User;
