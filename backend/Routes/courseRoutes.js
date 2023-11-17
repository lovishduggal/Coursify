import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseLectures,
    addLecture,
    deleteCourse,
    deleteLecture,
} from '../Controllers/courseController.js';
import singleUpload from '../Middlewares/multer.js';
import { authorizeAdmin, isAuthenticated } from '../Middlewares/auth.js';
const router = express.Router();

router.route('/courses').get(getAllCourses);
router
    .route('/createcourse')
    .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);
router
    .route('/course/:id')
    .get(isAuthenticated, getCourseLectures)
    .post(isAuthenticated, singleUpload, authorizeAdmin, addLecture)
    .delete(isAuthenticated, authorizeAdmin, deleteCourse);
router.route('/lecture').delete(isAuthenticated, authorizeAdmin, deleteLecture);
export default router;
