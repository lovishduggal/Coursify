import express from 'express';
import { register } from '../Controllers/userController.js';

const router = express.Router();

router.route('/register').post(register);

export default router;
