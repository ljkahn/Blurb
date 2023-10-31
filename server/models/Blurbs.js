const { Schema, model } = require("mongoose");

const date = new Date ();
const formattedDate = date.toLocaleDateString('en-US');

const commentSchema = new Schema({
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  commentAuthor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: formattedDate,
    required: true,
  },
  updatedAt: {
    type: Date,
  }
});

const blurbSchema = new Schema({
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  blurbText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  blurbAuthor: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: formattedDate,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  comments: [commentSchema],
});

const Blurbs = model("Blurbs", blurbSchema);

module.exports = Blurbs;