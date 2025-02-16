import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';
import testimonialRoutes from '../routes/testimonialRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import path from 'path';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);

export { app };
