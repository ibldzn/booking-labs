const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const historySchema = new mongoose.Schema({
  lab_id: {
    type: Types.ObjectId,
    ref: "Lab",
    required: true,
  },
  user_id: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
