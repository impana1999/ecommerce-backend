process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import xss from 'xss-clean';
// import rTracer from 'cls-rtracer';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import errorMiddleware from '@middlewares/error.middleware';
import { Routes } from '@interfaces/index';
import { logger, stream } from '@utils/logger';
import { serAgentCheck, ipMiddleware, reqRouteMiddleware } from '@middlewares/user-agent';
import('@globals/aws.global').then(() => null).catch(err => logger.error(err?.message));
// import('@globals/create-table.global').then(() => null).catch(err => logger.error(err?.message));

// import redis from '@globals/redis.client';
// import('@/globals/redis.client')
//   .then(conn => logger.info('Redis Connected to ' + conn?.default?.options?.host))
//   .catch(e => logger.error(e?.message || 'Redis is quitting'));
// redis
//   .set('app:name', 'HALLOCLUB')
//   .then(d => console.log('Redis is ' + d))
//   .catch(e => console.log("Redis isn't working. Error", e))
//   .catch(() => redis.quit().then(() => logger.error(err?.message || 'Redis is quitting')));
// Change Test

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  skipSuccessfulRequests: true,
});

class App {
  public app: express.Application
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();

    this.startCron();
    this.invokeFunctions();
    this.connectDB();
  }

  public listen() {
    return this.app.listen(this.port, () => {
      logger.info(`🚀 App listening in ${this.env} mode on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectDB() {
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Connected to DB successfully!'))
    .catch(err => console.log('Error connecting to DB', err));
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials'),
      }),
    );
    // this.app.use(rTracer.expressMiddleware());
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(hpp());
    this.app.use(xss());
    this.app.set('trust proxy', 1); // trust first proxyasdasd
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(reqRouteMiddleware);
    this.app.use(ipMiddleware);
    this.app.use(serAgentCheck);

    if (process.env.NODE_ENV === 'production') this.app.use('api/v1/auth', authLimiter);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'HC REST API',
          version: '1.0.0',
          description: 'Hallo Club API Documentation',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private startCron() {}

  private invokeFunctions() {}
}

export default App;
