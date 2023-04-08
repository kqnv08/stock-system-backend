import { ConnectionOptions } from "typeorm"
import { SnakeNamingStrategy } from "../core/lib"
import { join } from "path"
import * as dotenv from "dotenv"

dotenv.config()
const configOrm = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: ["**/*.entity*{.ts, .js}"],
  synchronize: process.env.BD_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  migrationsRun: true,
  migrations: [join(__dirname + "/../migrations/**/*{.ts,.js}")],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  namingStrategy: new SnakeNamingStrategy(),
} as ConnectionOptions

export default configOrm