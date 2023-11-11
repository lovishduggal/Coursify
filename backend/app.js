import express from 'express';
import { config } from 'dotenv';
config({
    path: './config/.env',
});
const app = express();

//Import routes here:
import course from './Routes/courseRoutes.js';
import user from './Routes/userRoutes.js';
app.use('/api/v1', course);
app.use('/api/v1', user);

export default app;
