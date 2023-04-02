import * as nodemailer from 'nodemailer';
import { UIFileRequest } from '../interfaces/file.interface';

interface EmailRequest {
  email: string,
  html: string,
  subject?: string,
  attachments?: Array<UIFileRequest>
}
export const sendEmail = async (
  {
    email,
    html,
    subject,
    attachments
  }: EmailRequest): Promise<boolean> => {
  try {
    const isTestingMail: boolean = JSON.parse(`${process.env.ENABLED_ACCOUNT_TEST}`)
    const toSend = isTestingMail ? process.env.MALING_ACCOUNT_TESTING : email
    const transporter = nodemailer.createTransport({
      host: process.env.MAILING_HOST,
      port: +process.env.MAILING_PORT,
      secure: process.env.MAILING_SECURE,
      auth: {
        user: process.env.MAILING_AUTH_USER,
        pass: process.env.MAILING_AUTH_PASS,
      },
    });
    const result = await transporter.sendMail({
      from: process.env.MAILING_AUTH_USER, // sender address
      to: toSend, // list of receivers
      subject, // Subject line
      html,
      attachments: attachments?.map(attachment => ({
        filename: attachment.filename,
        content: Buffer.from(attachment.base64, 'base64'),
      }))
    });
    return !!result?.messageId
  } catch (error) {
    return false
  }
};
