import express from 'express';
import {
    contact,
    courseRequest,
    getDashboardStats,
} from '../Controllers/otherController.js';
import { authorizeAdmin, isAuthenticated } from '../Middlewares/auth.js';
const router = express.Router();

router.route('/contact').post(contact);
router.route('/courserequest').post(courseRequest);
router
    .route('/admin/stats')
    .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
