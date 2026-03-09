const express = require("express");
const connectDB = require("./config/Database");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const requestRoute = require("./routes/request");
const userRoute = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = 7777;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/", authRoute);
app.use("/", profileRoute);
app.use("/", requestRoute);
app.use("/", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB()
  .then(() => {
    console.log("Database Connected Successfully ");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error In connecting to database ", err);
  });
