import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import { User } from '../Models/User.js';
import ErrorHandler from '../Utils/errorHandler.js';
import { sendToken } from '../Utils/sendToken.js';

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    // const file = req.file;
    // if (!name || !email || !password || !file)
    //     return next(new ErrorHandler('Please enter all field', 400));

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler('User Already Exist', 409));

    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'url',
            url: 'url',
        },
    });

    sendToken(res, user, 'Registered Successfully', 201);
});
