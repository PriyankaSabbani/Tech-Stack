const Result = require("../models/Result");

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({
      studentId: req.params.id
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
