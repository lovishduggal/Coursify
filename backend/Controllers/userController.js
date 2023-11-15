import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import { User } from '../Models/User.js';
import ErrorHandler from '../Utils/errorHandler.js';
import { sendEmail } from '../Utils/sendEmail.js';
import { sendToken } from '../Utils/sendToken.js';
import crypto from 'crypto';

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

export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
        success: true,
        user,
    });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
        return next(new ErrorHandler('Please enter all field', 400));

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return next(new ErrorHandler('Incorrect Old Password', 400));

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Password Changed Successfully',
    });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Profile Updated Successfully',
    });
});

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
    // const file = req.file;

    // const user = await User.findById(req.user._id);

    // const fileUri = getDataUri(file);
    // const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    // user.avatar = {
    //     public_id: mycloud.public_id,
    //     url: mycloud.secure_url,
    // };

    // await user.save();

    return res.status(200).json({
        success: true,
        message: 'Profile Picture Updated Successfully',
    });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler('User not found', 400));

    const resetToken = await user.getResetToken();
    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;
    await sendEmail(user.email, 'Coursify Reset Password', message);

    return res.status(200).json({
        success: true,
        message: `Reset Token has been sent to ${user.email}`,
    });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;

    // const resetPasswordToken = crypto
    //     .createHash('sha256')
    //     .update(token)
    //     .digest('hex');

    // const user = await User.findOne({
    //     resetPasswordToken,
    //     resetPasswordExpire: {
    //         $gt: Date.now(),
    //     },
    // });

    // if (!user)
    //     return next(
    //         new ErrorHandler('Token is invalid or has been expired', 401)
    //     );

    // user.password = req.body.password;
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;

    // await user.save();

    res.status(200).json({
        success: true,
        message: 'Password Changed Successfully',
        token,
    });
});
