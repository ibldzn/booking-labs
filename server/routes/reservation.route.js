const Router = require("express").Router();

const {
  getReservations,
  getReservationById,
  createReservation,
  getActiveReservations,
  getPastReservations,
  getFutureReservations,
} = require("../controllers/reservation.controller");

Router.get("/reservations", getReservations);
Router.get("/reservations/:id", getReservationById);
Router.post("/reservations", createReservation);
Router.get("/reservations/active", getActiveReservations);
Router.get("/reservations/past", getPastReservations);
Router.get("/reservations/future", getFutureReservations);

module.exports = Router;
