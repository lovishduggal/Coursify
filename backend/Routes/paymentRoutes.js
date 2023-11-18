import express from 'express';
import { isAuthenticated } from '../Middlewares/auth.js';
import {
    buySubscription,
    cancelSubscription,
    getRazorPayKey,
    paymentVerification,
} from '../Controllers/payment.Controller.js';
const router = express.Router();

/* The code is defining different routes for handling HTTP requests in an Express.js application. */
router.route('/subscribe').post(isAuthenticated, buySubscription);
router.route('/paymentverification').post(isAuthenticated, paymentVerification);
router.route('/razorpaykey').get(getRazorPayKey);
router.route('/subscribe/cancel').delete(isAuthenticated, cancelSubscription);

export default router;
