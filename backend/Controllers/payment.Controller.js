import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import { Payment } from '../Models/Payment.js';
import { User } from '../Models/User.js';
import { razorpay } from '../server.js';
import crypto from 'crypto';

export const buySubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user.role === 'admin')
        return next(new ErrorHandler("Admin can't buy subscription", 400));

    const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
    await user.save();

    return res.status(200).json({
        success: true,
        subscriptionId: subscription.id,
        user,
    });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
    const {
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(req.user._id);
    const subscription_id = user.subscription.id;

    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(razorpay_payment_id + '|' + subscription_id, 'utf-8')
        .digest('hex');
    const isAuthentic = generated_signature === razorpay_signature;
    if (!isAuthentic)
        return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

    await Payment.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id,
    });

    user.subscription.status = 'active';
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        user,
    });
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
    });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const subscriptionId = user.subscription.id;

    let refund = false;

    const payment = await Payment.findOne({
        razorpay_subscription_id: subscriptionId,
    });

    const gap = Date.now() - payment.createdAt;
    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if (refundTime > gap) {
        await razorpay.payments.refund(payment.razorpay_payment_id);
        refund = true;
    }

    await payment.deleteOne({});
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        message: refund
            ? 'Subscription cancelled, You will receive full refund within 7 days.'
            : 'Subscription cancelled, No refund initiated as subscription was cancelled after 7 days.',
        user,
    });
});
