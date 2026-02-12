const router = require("express").Router();
const {
  addFeedback,
  getFeedback
} = require("../controllers/feedbackController");

router.post("/", addFeedback);
router.get("/", getFeedback);

module.exports = router;
