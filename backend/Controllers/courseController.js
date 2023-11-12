import { Course } from '../Models/Course.js';

export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {}
};
