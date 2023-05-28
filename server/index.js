require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const { connectDB } = require("./config/mongodb.connection");
const app = express();

const PORT = process.env.PORT || 8081;

const start = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    session({
      name: "sid",
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
  app.use(express.json({ extended: false }));

  app.use("/api/v1", require("./routes/auth.route"));
  app.use("/api/v1", require("./routes/labs.route"));
  app.use("/api/v1", require("./routes/reservation.route"));
  app.use("/api/v1", require("./routes/user.route"));

  app.get("/api/v1/laboran", (req, res) => {
    res.json([
      {
        name: "Teni Amalia",
        phone: "0821-2151-2892",
      },
      {
        name: "Gina Agnia",
        phone: "0857-2446-6240",
      },
      {
        name: "Fretty Lendifah E N",
        phone: "0877-3781-9177",
      },
    ]);
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

connectDB().then(start);
