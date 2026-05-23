import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { sequelize } from "./models/index.js";

// Rute
import authRoutes from "./routes/auth.js";
import mealRoutes from "./routes/meals.js";
import donationRoutes from "./routes/donations.js";

const api = express();
const port = 3000;

//
// ========================
// MIDDLEWARE
// ========================
//
api.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

api.use(bodyParser.json());

//
// ========================
// ROUTE TEST ROOT
// ========================
//
api.get("/", (req, res) => {
  res.send("CampusEats API is running!");
});

//
// ========================
// HEALTH CHECK (IMPORTANT)
// ========================
//
api.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "OK",
      database: "CONNECTED",
      api: "RUNNING"
    });
  } catch (err) {
    res.status(500).json({
      status: "FAIL",
      database: "NOT CONNECTED",
      error: err.message
    });
  }
});

//
// ========================
// API ROUTES
// ========================
//
api.use("/api/auth", authRoutes);
api.use("/api/meals", mealRoutes);
api.use("/api/donations", donationRoutes);

//
// ========================
// BOOTSTRAP SERVER
// ========================
//
async function bootstrap() {
  try {
    // 1. Test DB connection
    await sequelize.authenticate();
    console.log("Conexiune la MySQL reușită (Docker).");

    // 2. Sync models
    await sequelize.sync({ alter: true });
    console.log("Modelele au fost sincronizate.");

    // 3. Start server
    api.listen(port, "0.0.0.0", () => {
      console.log(`API rulează pe portul ${port}`);
    });

  } catch (error) {
    console.error("Eroare la pornirea API-ului:", error);
  }
}

bootstrap();