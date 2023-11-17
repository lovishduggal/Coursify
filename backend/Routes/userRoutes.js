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
    addToPlaylist,
    removeFromPlaylist,
} from '../Controllers/userController.js';
import { isAuthenticated } from '../Middlewares/auth.js';
import singleUpload from '../Middlewares/multer.js';

const router = express.Router();

router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticated, getMyProfile);
router.route('/changepassword').put(isAuthenticated, changePassword);
router.route('/updateprofile').put(isAuthenticated, updateProfile);
router
    .route('/updateprofilepicture')
    .put(isAuthenticated, singleUpload, updateProfilePicture);

router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);
export default router;
