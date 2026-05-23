import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const api = express();
const port = 3000;

api.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
    credentials: true,
  }),
);

api.use(bodyParser.json());

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
