const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./middlewares/mongoConnection.js").connectDB();
require("dotenv").config({ path: "./.env" });

// cors
const cors = require("cors");
// app.use(
//   cors({
//     origin: env_config.frontend_url,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );
app.use(cors({ credentials: true, origin: true }));
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin; report-to=default');
//   next();
// });

const logger = require("morgan");
app.use(logger("tiny"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET,
  })
);
app.use(cookieparser());

app.use(bodyParser.json());

app.use("/user", require("./routes/userRoutes.js"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

