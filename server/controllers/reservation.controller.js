const { StatusCodes } = require("http-status-codes");
const Reservation = require("../models/reservation.model");
const Lab = require("../models/lab.model");

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
    let {
      lab_id,
      user_id,
      start_time = Math.floor(Date.now() / 1000),
      end_time,
    } = req.body;

    if (!lab_id || !user_id || !end_time) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing required fields" });
    }

    if (start_time >= end_time) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Start time must be before end time" });
    }

    const lab = await Lab.findById(lab_id);
    if (!lab) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Lab not found" });
    }

    start_time = new Date(start_time * 1000);
    end_time = new Date(end_time * 1000);

    if (!(await lab.isReservable(start_time, end_time))) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Lab is already reserved for this time" });
    }

    const reservation = await Reservation.create({
      lab_id,
      user_id,
      start_time,
      end_time,
    });
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
        { start_time: { $lte: currentTime } },
        { end_time: { $gte: currentTime } },
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
      end_time: { $lt: currentTime },
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
      start_time: { $gt: currentTime },
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

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Reservation not found" });
    }

    await reservation.deleteOne();

    return res.status(StatusCodes.OK).json({ message: "Reservation deleted" });
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
  deleteReservation,
};
