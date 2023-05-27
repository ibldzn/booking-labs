const Router = require("express").Router();

const { isAuthenticated } = require("../middlewares/app.authentication");

const {
  getReservations,
  getReservationById,
  createReservation,
  getActiveReservations,
  getPastReservations,
  getFutureReservations,
  deleteReservation,
} = require("../controllers/reservation.controller");

Router.get("/reservations", getReservations);
Router.get("/reservations/:id", getReservationById);
Router.post("/reservations", isAuthenticated, createReservation);
Router.get("/reservations/active", getActiveReservations);
Router.get("/reservations/past", getPastReservations);
Router.get("/reservations/future", getFutureReservations);
Router.delete("/reservations/:id", isAuthenticated, deleteReservation);

module.exports = Router;
