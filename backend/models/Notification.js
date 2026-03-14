const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  date: Date
});

module.exports = mongoose.model("Notification", notificationSchema);
