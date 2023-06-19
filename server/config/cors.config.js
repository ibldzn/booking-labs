const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  "http://192.168.1.69:8080",
  "http://192.168.1.69:8081",
  "http://192.168.1.10:8080",
  "http://192.168.1.10:8081",
  "https://booking-labs.vercel.app/",
];

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
