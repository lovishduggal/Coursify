import express from 'express';
import { config } from 'dotenv';
import { ErrorMiddleware } from './Middlewares/Error.js';
import course from './Routes/courseRoutes.js';
import user from './Routes/userRoutes.js';
config({
    path: './config/.env',
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', course);
app.use('/api/v1', user);

app.use(ErrorMiddleware);
export default app;
