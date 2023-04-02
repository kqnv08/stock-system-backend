import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
    },
    auth: {
      google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      }
    },
    production: process.env.PRODUCTION === 'true',
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    playground: process.env.PLAYGROUND === 'true',

    externalApi: {
      banza: {
        baseUrl: process.env.BANZA_BASE_URL,
        authUser: process.env.BANZA_AUTH_USER,
        authSecret: process.env.BANZA_AUTH_SECRET,
        baseUrlV2: process.env.BANZA_BASE_URL_V2,
        operationFee: process.env.BANZA_OPERATION_FEES,
        externalChannel: process.env.BANZA_EXTERNAL_CHANNEL,
        commercialCode: process.env.BANZA_COMMERCIAL_CODE,
        commercialRole: process.env.BANZA_COMMERCIAL_ROLE
      },
      hubspot: {
        baseUrl: process.env.HUBSPOT_BASE_URL,
        authSecret: process.env.HUBSPOT_AUTH_SECRET,
      },
    }

  }
});
