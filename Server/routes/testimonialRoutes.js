import express from 'express';
import { addTestimonial, getTestimonials } from '../controller/testimonialController.js';
import upload from '../middleware/upload.js'; // Import multer middleware

const router = express.Router();

// Add a testimonial (with image upload)
router.post('/add', upload.single('image'), addTestimonial);

// Get all testimonials
router.get('/all', getTestimonials);

export default router;
