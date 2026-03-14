const Transport = require("../models/Transport");

exports.getTransport = async (req, res) => {
  try {
    const routes = await Transport.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
