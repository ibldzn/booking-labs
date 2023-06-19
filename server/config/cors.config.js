const allowedOrigins = ["https://booking-labs.vercel.app"];

const corsOptions = {
  origin: (origin, next) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("Origin not allowed"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
