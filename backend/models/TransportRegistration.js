const mongoose = require('mongoose');

const transportRegistrationSchema = new mongoose.Schema({
  id: String,
  name: String,
  course: String,
  route: String,
  stop: String,
  fee: Number,
  paid: Number,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('TransportRegistration', transportRegistrationSchema);