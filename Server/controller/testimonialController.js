import Testimonial from '../models/Testimonial.js';

// Add a new testimonial with image upload
const addTestimonial = async (req, res) => {
  try {
    const { name, profession, review, stars } = req.body;
    const image = req.file ? req.file.path : ''; // Save uploaded image path

    const newTestimonial = new Testimonial({ name, profession, review, stars, image });
    await newTestimonial.save();

    res.status(201).json({ message: 'Testimonial added successfully', testimonial: newTestimonial });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
};

// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

export { addTestimonial, getTestimonials };
