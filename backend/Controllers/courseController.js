import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import { Course } from '../Models/Course.js';

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find();
    return res.status(200).json({
        success: true,
        courses,
    });
});
