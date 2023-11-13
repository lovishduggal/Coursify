import express from 'express';
import { config } from 'dotenv';
import { ErrorMiddleware } from './Middlewares/Error.js';
config({
    path: './config/.env',
});
const app = express();

//Import routes here:
import course from './Routes/courseRoutes.js';
import user from './Routes/userRoutes.js';
app.use('/api/v1', course);
app.use('/api/v1', user);

app.use(ErrorMiddleware);
export default app;
