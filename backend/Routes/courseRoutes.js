import express from 'express';
import {
    createCourse,
    getAllCourses,
} from '../Controllers/courseController.js';
const router = express.Router();

router.route('/courses').get(getAllCourses);
router.route('/createcourse').post(createCourse);

export default router;
