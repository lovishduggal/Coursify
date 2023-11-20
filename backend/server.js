import app from './app.js';
import { connectDB } from './Config/database.js';
import { v2 } from 'cloudinary';
import Razorpay from 'razorpay';
import nodeCron from 'node-cron';
import { Stats } from './Models/Stats.js';
connectDB();

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

nodeCron.schedule('0 0 0  5 * *', async () => {
    try {
        await Stats.create({});
    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on ${process.env.PORT || 3001}`);
});
