const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const prodRoutes = require("./routes/prodRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/product", prodRoutes);
app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
