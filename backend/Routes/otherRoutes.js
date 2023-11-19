import express from 'express';
import { contact, courseRequest } from '../Controllers/otherController.js';
const router = express.Router();

router.route('/contact').post(contact);
router.route('/courserequest').post(courseRequest);

export default router;
