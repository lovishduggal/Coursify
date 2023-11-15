import express from 'express';
import {
    changePassword,
    forgotPassword,
    getMyProfile,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    updateProfilePicture,
} from '../Controllers/userController.js';
import { isAuthenticated } from '../Middlewares/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticated, getMyProfile);
router.route('/changepassword').put(isAuthenticated, changePassword);
router.route('/updateprofile').put(isAuthenticated, updateProfile);
router
    .route('/updateprofilepicture')
    .put(isAuthenticated, updateProfilePicture);

router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);
export default router;
