import dotenv from "dotenv";

dotenv.config();


import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js"
import feeRoutes from "./routes/feeRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"



connectDB();

const app = express();


app.use(cors());

// app.use(

// "/uploads",

// express.static(
// "uploads"
// )

// )

app.use(express.json({
  limit: "10mb"
}));

app.use(express.urlencoded({
  limit: "10mb",
  extended: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/schedule",scheduleRoutes)
app.use("/api/fees",feeRoutes)
app.use("/api/contact",contactRoutes)


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Bright Future Backend Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
