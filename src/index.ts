import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  return app.listen(3333, () => {
    console.log("Server is running on port 3333");
  });
});
