import { createTransport } from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        to,
        subject,
        text,
        from: process.env.SMTP_FROM_EMAIL,
    });
};
