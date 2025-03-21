import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'your email',
    pass: 'password',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function mailOption(toEmail: string): nodemailer.SendMailOptions {
  return {
    from: '"COZMO" <impanav97@gmail.com>',
    to: toEmail,
    subject: 'Received invitation from Cozmo',
    html: `
      <h3>Dear User,</h3>
      <h4>This is the invitation mail for your Event Booking</h4>
      <p>Note:Pease Donot share this mail with anyone</p>
    `,
  };
}

async function sendMail(toEmail: string): Promise<void> {
  try {
    const mailOptions: nodemailer.SendMailOptions = mailOption(toEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

function mailOptions  (toEmail, otp):nodemailer.SendMailOptions {
  return{
    from: '"COZMO" <impanav97@gmail.com>',
    to: toEmail,
    subject: 'Receive OTP From Cozmo',
    html: `
      <h3>Dear User,</h3>
      <h4>${otp}, Find here your OTP for login, Cozmo</h4>
      <p>Note: This is a one-time password. Do not share it with anyone.</p>
    `,
  }
}
async function sendmail(toEmail,otp): Promise<void> {
  try {
    const mailOption: nodemailer.SendMailOptions = mailOptions(toEmail,otp);
    const info = await transporter.sendMail(mailOption);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
export { sendMail,sendmail };
