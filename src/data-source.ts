import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "typeorm",
  subscribers: [],
  entities: ["src/database/entities/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
});
