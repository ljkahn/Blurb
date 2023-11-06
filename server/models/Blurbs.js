const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema({
  likeList: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  commentAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  updatedAt: {
    type: Date,
    get: (timestamp) => dateFormat(timestamp)
  }
}, 
{
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

commentSchema.virtual("likes").get(function () {
  return this.likeList.length;
})

const blurbSchema = new Schema({
  likeList: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  blurbText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  blurbAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  updatedAt: {
    type: Date,
  },
  comments: [commentSchema],
  tags: [String]
}, 
{
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

blurbSchema.virtual("likes").get(function () {
  return this.likeList.length;
});

const Blurbs = model("Blurbs", blurbSchema);

module.exports = Blurbs;