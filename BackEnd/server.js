const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.routes");
const PDFManeger = require('./routers/PDFManager.routes')
const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend URL
  credentials: true // Allow sending cookies
}));

app.use(bodyParser.json());
app.use(cookieParser());

const URL = process.env.MONGODB_URL;

// Database connection
mongoose
  .connect(URL)
  .then(async () => {
    console.log("Database connected");
  })
  .catch((err) => console.log("Database not connected", err));

// Routes
app.use("/auth", authRouter);
app.use("/PDFmanagemet",PDFManeger)

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
