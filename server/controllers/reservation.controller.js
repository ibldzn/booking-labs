const { StatusCodes } = require("http-status-codes");
const Reservation = require("../models/reservation.model");

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    if (reservations?.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No reservations found" });
    }
    return res.status(StatusCodes.OK).json(reservations);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Reservation not found" });
    }

    return res.status(StatusCodes.OK).json(reservation);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    return res.status(StatusCodes.CREATED).json(reservation);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

const getActiveReservations = async (req, res) => {
  try {
    const currentTime = new Date();
    const reservations = await Reservation.find({
      $and: [
        { startDate: { $lte: currentTime } },
        { endDate: { $gte: currentTime } },
      ],
    });

    if (reservations?.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No active reservations found" });
    }
    return res.status(StatusCodes.OK).json(reservations);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

const getPastReservations = async (req, res) => {
  try {
    const currentTime = new Date();
    const reservations = await Reservation.find({
      endDate: { $lt: currentTime },
    });

    if (reservations?.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No past reservations found" });
    }
    return res.status(StatusCodes.OK).json(reservations);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

const getFutureReservations = async (req, res) => {
  try {
    const currentTime = new Date();
    const reservations = await Reservation.find({
      startDate: { $gt: currentTime },
    });

    if (reservations?.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No future reservations found" });
    }
    return res.status(StatusCodes.OK).json(reservations);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

module.exports = {
  getReservations,
  getReservationById,
  createReservation,
  getActiveReservations,
  getPastReservations,
  getFutureReservations,
};
