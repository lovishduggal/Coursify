import express from 'express';
import {
    getMyProfile,
    login,
    logout,
    register,
} from '../Controllers/userController.js';
import { isAuthenticated } from '../Middlewares/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticated, getMyProfile);

export default router;
