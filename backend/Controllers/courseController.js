import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import { Course } from '../Models/Course.js';
import ErrorHandler from '../Utils/errorHandler.js';

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find().select('-lectures');
    return res.status(200).json({
        success: true,
        courses,
    });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy)
        return next(new ErrorHandler('Please add all fields', 400));
    // const file = req.file;

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            public_id: 'url',
            url: 'url',
        },
    });

    res.status(201).json({
        success: true,
        message: 'Course Created Successfully. You can add lectures now.',
    });
});
