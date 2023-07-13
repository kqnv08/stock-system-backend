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
import { AuthModule } from './core/lib/auth/auth.module';


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
      sortSchema: true,
      context: ({ extra }) => ({ extra }),
      playground: process.env.NODE_ENV !== 'production',
    }),
    DataBaseModule,
    HQLModule,
    AuthModule,
  ]
})
export class AppModule { }