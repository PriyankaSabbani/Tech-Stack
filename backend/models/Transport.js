const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  route: String,
  driver: String,
  timing: String
});

module.exports = mongoose.model("Transport", transportSchema);
