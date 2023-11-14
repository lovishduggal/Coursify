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

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // const file = req.file;
    if (!email || !password)
        return next(new ErrorHandler('Please enter all field', 400));

    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new ErrorHandler('User does not exit', 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return next(
            new ErrorHandler(
                'Incorrect Password, Please check your Password',
                401
            )
        );
    sendToken(res, user, `Welcome back ${user.name}`, 201);
});

export const logout = catchAsyncError(async (req, res, next) => {
    return res
        .status(200)
        .cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            // secure: true,
            sameSite: 'none',
        })
        .json({
            success: true,
            message: 'Logged Out Successfully',
        });
});
