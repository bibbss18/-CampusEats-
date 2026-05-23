import { sequelize } from "./db.js";
import "./entities/index.js";

sequelize.sync({ alter: true }).then(() => {
  console.log("FINISHED SUCCESS");
  process.exit(0);
});