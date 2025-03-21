export interface IConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint?: string;
  dynamoDbCrc32?: boolean;
}
