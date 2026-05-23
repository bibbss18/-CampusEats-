import { Sequelize } from "sequelize";

const db = {
  NAME: "campuseats",
  USERNAME: "user",
  PASSWORD: "user",
  options: {
    dialect: "mysql",
    timezone: "+00:00",
    host: "mysql", // Numele serviciului din compose.yaml
    port: 3306,
    logging: false,
  },
};

export const sequelize = new Sequelize(
  db.NAME,
  db.USERNAME,
  db.PASSWORD,
  db.options,
);