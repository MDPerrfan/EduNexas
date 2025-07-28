import express from 'express';
import { Testimonial } from '../models/Testimonial.js';
import { User } from '../models/User.js'; // Assuming you have a User model

const testimonialRouter = express.Router();

// GET all testimonials with user name & image
testimonialRouter.get('/all', async(req, res) => {
    try {
        const testimonials = await Testimonial.find()
            .populate({
                path: 'userId',
                select: 'name imageUrl' // only get name and image fields
            })
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, testimonials });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching testimonials' });
    }
});

export default testimonialRouter;