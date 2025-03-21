process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import os from 'os';
import 'dotenv/config';
import App from '@/app';
// import { validateDynamoDBTable, validateEnv } from '@utils/validateEnv';
import router from './routes/router';

// validateEnv();
// validateDynamoDBTable();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cpuCores = os.cpus().length;

// console.log(13, cpuCores);
// console.log(13, process.env.UV_THREADPOOL);

const app = new App(router);

const server = app.listen();

const exitHandler = (er: any) => {
  console.log('exitHandler', er);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unexpectedErrorHandler = error => exitHandler(error);

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
