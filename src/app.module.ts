import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MyResolver } from './resolver';
import { DataBaseModule } from './data-base.module';
import { HQLModule } from './graphql/hql.module';
import { ConfigModule } from '@nestjs/config';
import config from "./config/config.config";
import { environments } from './config/environments.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: environments[process.env.NODE_ENV] || '.env'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: true,
      sortSchema: true,
    }),
    DataBaseModule,
    HQLModule
  ],
  providers:[MyResolver]
})
export class AppModule { }