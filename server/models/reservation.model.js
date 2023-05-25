const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const reservationSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
