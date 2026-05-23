import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { sequelize } from "./models/index.js";

import authRoutes from "./routes/auth.js";
import mealRoutes from "./routes/meals.js";
import donationRoutes from "./routes/donations.js";

const api = express();
const port = 3000;

api.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

api.use(bodyParser.json());

api.get("/", (req, res) => {
  res.send("CampusEats API is running!");
});

api.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "OK", database: "CONNECTED", api: "RUNNING" });
  } catch (err) {
    res.status(500).json({ status: "FAIL", database: "NOT CONNECTED", error: err.message });
  }
});

api.use("/api/auth", authRoutes);
api.use("/api/meals", mealRoutes);
api.use("/api/donations", donationRoutes);

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("Conexiune la MySQL reușită (Docker).");
    await sequelize.sync({ alter: true });
    console.log("Modelele au fost sincronizate.");
    api.listen(port, "0.0.0.0", () => {
      console.log(`API rulează pe portul ${port}`);
    });
  } catch (error) {
    console.error("Eroare la pornirea API-ului:", error);
  }
}

bootstrap();