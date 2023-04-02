import { Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import config from "./config/config.config";
import { SnakeNamingStrategy } from "./core/lib";
import { DatabaseLogger } from "./core/lib/utils/database-logger.util";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configuService: ConfigType<typeof config>) => {
        const { host, port, user, pass, name, synchronize, logging } = configuService.database
        return {
          type: "postgres",
          host: host,
          port: port,
          username: user,
          password: pass,
          database: name,
          entities: [join(__dirname, "**/**.entity{.ts,.js}")],
          synchronize: synchronize,
          logging: logging,
          namingStrategy: new SnakeNamingStrategy(),
          // logger: new DatabaseLogger()
          // extra: {
          //   charset: configService.get("DB_CHARSET")
          // }
        }
      },
      inject: [config.KEY],
    })
  ]
})
export class DataBaseModule { }
