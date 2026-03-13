const mongoose = require('mongoose');

const transportRouteSchema = new mongoose.Schema({
  id: String,
  name: String,
  stops: String,
  distance: String,
  buses: Number,
  students: Number,
  fee: Number,
  driver: String
});

module.exports = mongoose.model('TransportRoute', transportRouteSchema);