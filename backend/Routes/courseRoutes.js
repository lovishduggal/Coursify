import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseLectures,
    addLecture,
} from '../Controllers/courseController.js';
import singleUpload from '../Middlewares/multer.js';
const router = express.Router();

router.route('/courses').get(getAllCourses);
router.route('/createcourse').post(singleUpload, createCourse);
router
    .route('/course/:id')
    .get(getCourseLectures)
    .post(singleUpload, addLecture);

export default router;
