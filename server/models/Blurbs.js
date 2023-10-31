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
  },
  commentAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
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
  },
  blurbAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  comments: commentSchema,
});

const Blurbs = model("Blurbs", blurbSchema);

module.exports = Blurbs;