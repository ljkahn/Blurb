const Notification = require("../models/notifications");

async function sendNotification({ recipient, type, sender }) {
  const notification = new Notification({
    sender: this,
    username: this._id,
    recipient: recipient._id,
    type,
  } 
);  await notification.save();

  this.notifications.push(notification);
  await this.save();
}

module.exports = sendNotification;
