const Fee = require("../models/Fee");

exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.findOne({
      studentId: req.params.id
    });

    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
