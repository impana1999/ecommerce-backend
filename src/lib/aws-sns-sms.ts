import { AWS } from '@globals/aws.global';
import { SNS } from 'aws-sdk';
import { logger } from '@utils/logger';

export const sendSMSWithSNS = async (message, countryCode, mobile) => {
  try {
    const params: SNS.PublishInput = {
      Message: message,
      PhoneNumber: countryCode + mobile,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': { DataType: 'String', StringValue: 'HALLOCLUB' },
        'AWS.SNS.SMS.SMSType': { DataType: 'String', StringValue: 'Transactional' },
        // For Promotional
        // 'AWS.SNS.SMS.SMSType': {"DataType": "String", "StringValue": "Promotional"}
      },
    };

    const sentMessageStatus: SNS.PublishResponse = await new AWS.SNS().publish(params).promise();

    return sentMessageStatus;
  } catch (err) {
    logger.error(err?.message || "SNS Message wasn't delivered ");
  }
};
