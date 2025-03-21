import { AWS } from '@globals/aws.global';
import { SES } from 'aws-sdk';
import { isEmpty } from '@utils/util';

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export const sendEmail = async (
  to: Array<string>,
  subject: string,
  source: string,
  dontReplay = true,
  messageHTML?: string,
  messageText?: string,
  cc?: Array<string>,
  bcc?: Array<string>,
  replyTo?: Array<string>,
  sourceArn?: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const emailParams: SES.SendEmailRequest = {
      Destination: {},
      Message: {
        Body: {},
        Subject: {
          Charset: 'UTF-8',
          Data: '',
        },
      },
      Source: '' /* required */,
      ReplyToAddresses: [],
    };

    if (!isEmpty(bcc)) emailParams.Destination.BccAddresses = bcc;
    if (!isEmpty(cc)) emailParams.Destination.CcAddresses = cc;
    if (!isEmpty(to)) emailParams.Destination.ToAddresses = to;
    if (!isEmpty(subject)) emailParams.Message.Subject.Data = subject;
    if (!isEmpty(source)) emailParams.Source = source;
    if (!isEmpty(sourceArn)) emailParams.SourceArn = sourceArn;
    if (!isEmpty(replyTo)) emailParams.ReplyToAddresses = replyTo;

    if (dontReplay && !isEmpty(messageHTML)) {
      messageHTML = messageHTML.concat(`
        <br />
        <br />
        <strong>This is an automated Email. Kindly Don't replay to this conversation</strong>`);
    }

    if (dontReplay && !isEmpty(messageText)) {
      messageText = messageText.concat(`
        \n \n This is an automated Email. Kindly Don't replay to this conversation
      `);
    }

    if (!isEmpty(messageHTML)) {
      emailParams.Message.Body.Html.Data = messageHTML;
      emailParams.Message.Body.Html.Charset = 'UTF-8';
    }
    if (!isEmpty(messageText)) {
      emailParams.Message.Body.Text.Data = messageText;
      emailParams.Message.Body.Html.Charset = 'UTF-8';
    }

    const success: SES.SendEmailResponse = await ses.sendEmail(emailParams).promise();

    return {
      success: true,
      message: 'EMail was delivered and the MessageID is:' + success.MessageId,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Email wasn't delivered",
    };
  }
};
