const Feedback = require("../models/Feedback");

exports.addFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json("Feedback saved successfully");
  } catch (error) {
    res.status(500).json("Error saving feedback");
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const data = await Feedback.find();
    res.json(data);
  } catch (error) {
    res.status(500).json("Error fetching feedback");
  }
};
