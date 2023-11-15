const Notification = require("../models/notifications");

async function sendNotification({ recipient, type, sender }) {
  const notification = new Notification({
    sender: sender.username,
    recipient: recipient._id,
    type,
  });

  await notification.save();

  await recipient.sendNotification(notification);
}

module.exports = sendNotification;
