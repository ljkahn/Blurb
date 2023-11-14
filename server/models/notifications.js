// const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");

// const notificationSchema = new Schema({
//     userName: {
//       type: String,
//       required: true,
//     },
//     recipientUserId: {
//       type: String,
//       required: true,
//     },
//     senderUserId: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       required: true,
//     },
//     threadID: {
//       type: String,
//       required: true,
//     },
//     threadData: {
//       type: Schema.Types.Mixed,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (timestamp) => dateFormat(timestamp)
//       },
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   });

//   const Notification = model("Notification", notificationSchema);

// module.exports = Notification;