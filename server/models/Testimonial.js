import mongoose from "mongoose";
const testimonialSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    name: String,
    image: String,
    feedback: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);