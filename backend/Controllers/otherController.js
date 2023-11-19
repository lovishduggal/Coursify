import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import ErrorHandler from '../Utils/errorHandler.js';
import { sendEmail } from '../Utils/sendEmail.js';

export const contact = catchAsyncError(async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
        return next(new ErrorHandler('All fields are mandatory', 400));

    const to = process.env.SMTP_FROM_EMAIL;
    const subject = 'Contact from Coursify';
    const text = `I am ${name} and my Email is ${email}. \n${message}`;
    await sendEmail(to, subject, text);

    return res.status(200).json({
        success: true,
        message: 'Your Message Has Been Sent.',
    });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
    const { name, email, course } = req.body;
    if (!name || !email || !course)
        return next(new ErrorHandler('All fields are mandatory', 400));

    const to = process.env.SMTP_FROM_EMAIL;
    const subject = 'Requesting for a course on Coursify';
    const text = `I am ${name} and my Email is ${email}. \n${course}`;
    await sendEmail(to, subject, text);

    return res.status(200).json({
        success: true,
        message: 'Your Request Has Been Sent.',
    });
});
