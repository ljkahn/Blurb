const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const notificationSchema = new Schema({
  userName: {
    type: String,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
  },
  blurbId: {
    type: Schema.Types.ObjectId,
    ref: "Blurbs",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
