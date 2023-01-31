import express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";
import cors from "cors";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(router);

  return app.listen(3333, () => {
    console.log("Server is running on port 3333");
  });
});
