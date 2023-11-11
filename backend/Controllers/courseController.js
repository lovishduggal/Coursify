export const getAllCourses = (req, res, next) => {
    return res.status(200).json({
        success: true,
        courses: [{}],
    });
};
