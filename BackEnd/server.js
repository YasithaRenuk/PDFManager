const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const {authenticateToken} = require("./middleware/jwt.service")

const authRouter = require("./routers/auth.routes");
const PDFManager = require('./routers/PDFManager.routes');

const app = express();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allow sending cookies
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Database connection
mongoose.connect(URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Serve static files
app.use('/uploads', authenticateToken, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/auth", authRouter);
app.use("/PDFmanagement", PDFManager); // Corrected route path

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
