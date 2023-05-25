const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: false,
    default: [],
  },
});

const Lab = mongoose.model("Lab", labSchema);

module.exports = Lab;
