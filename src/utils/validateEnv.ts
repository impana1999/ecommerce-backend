// import { cleanEnv, port, str, num } from 'envalid';
// import * as DBTableNames from '@/constants/table-name.constants';

// const validateEnv = () => {
//   cleanEnv(process.env, {
//     NODE_ENV: str(),
//     PORT: port(),
//     TABLE_THROUGHPUT: num(),
//     AWS_ACCESS_KEY_ID: str(),
//     AWS_SECRET_ACCESS_KEY: str(),
//     AWS_REGION: str(),
//     DYNAMODB_ENDPOINT: str(),
//     AWS_S3_BUCKET: str(),
//     JWT_ACCESS_TOKEN_SECRET: str(),
//     JWT_REFRESH_TOKEN_SECRET: str(),
//     JWT_ACCESS_EXPIRATION_MINUTES: num(),
//     ADMIN_MOBILE: str(),
//     ADMIN_COUNTRY_CODE: str(),
//   });
// };

// const validateDynamoDBTable = () => {
//   cleanEnv(DBTableNames, {
//     ROOM_MEMBER_TABLE: str(),
//     CLUB_MEMBER_TABLE: str(),
//     NOTIFICATION_TABLE: str(),
//     CLUB_TABLE: str(),
//     ROOM_TABLE: str(),
//     LIST_TABLE: str(),
//     TASK_TABLE: str(),
//     INCIDENT_TABLE: str(),
//     INCIDENT_REASON_TABLE: str(),
//     BUSINESS_CARD_TABLE: str(),
//     USER_TABLE: str(),
//     CLUB_INTEREST: str(),
//     USER_SETTINGS: str(),
//     INTEREST_TABLE: str(),
//     INTEREST_GROUP_TABLE: str(),
//     USER_BLOCK_TABLE: str(),
//     USER_INTERESTS_TABLE: str(),
//     POLL_TABLE: str(),
//     POLL_OPTION_TABLE: str(),
//     TRACK_TABLE: str(),
//     TRACK_USER_TABLE: str(),
//     NETWORKING_TABLE: str(),
//     NEWS_FEED_TABLE: str(),
//     MATCHED_USER: str(),
//     INVITATION_TABLE: str(),
//     ROOM_INVITATION_MEMBER_TABLE: str(),
//     LANGUAGE_NAME: str(),
//     LANGUAGE_PREFERENCES: str(),
//     HIDE_ROOM_TABLE: str(),
//     ROOM_USER_LIST_TABLE: str(),
//     INVITATION_CODE_TABLE: str(),
//     CLUB_INVITATION_MEMBER_TABLE: str(),
//     CHAT_HISTORY_TABLE: str()
//   });
// };

// export { validateEnv, validateDynamoDBTable };
