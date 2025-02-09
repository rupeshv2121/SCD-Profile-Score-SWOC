import mongoose from 'mongoose';

// Testimonial schema
const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  image: {
    type: String, // Image path
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
