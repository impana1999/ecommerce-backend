import * as AWS from 'aws-sdk';
import message from "aws-sdk/lib/maintenance_mode_message.js";
import { IConfig } from '@interfaces/index';

const config: IConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-south-1',
};

message.suppress = true;

AWS.config.update(config);


export { AWS };
