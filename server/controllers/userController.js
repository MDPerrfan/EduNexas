import { User } from "../models/User.js"
import { Purchase } from '../models/Purchase.js';
import Course from '../models/Course.js';
import Stripe from 'stripe'
import { CourseProgress } from "../models/CourseProgress.js";
import { Testimonial } from "../models/Testimonial.js";

//get user data
export const getUserData = async(req, res) => {
    try {
        const { userId } = req.auth()
        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "User not found!" })
        }
        res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Users enrolled courses with lecture links
export const userEnrolledCourses = async(req, res) => {
        try {
            const { userId } = req.auth()
            const userData = await User.findById(userId).populate('enrolledCourses')
            res.json({ success: true, enrolledCourses: userData.enrolledCourses })

        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }
    //buy course
export const purchaseCourse = async(req, res) => {
        try {
            const { courseId } = req.body
            const { origin } = req.headers
            const { userId } = req.auth()
            const userData = await User.findById(userId)
            const courseData = await Course.findById(courseId)
            if (!userData || !courseData) {
                return res.json({ success: false, message: "Data not found" })
            }
            const purchaseData = {
                courseId: courseData._id,
                userId,
                amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
            }
            const newPurchase = await Purchase.create(purchaseData)

            //stripe gateway 
            const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

            const currency = process.env.CURRENCY.toLowerCase()
                //creating line items for stripe 
            const line_items = [{
                price_data: {
                    currency,
                    product_data: {
                        name: courseData.courseTitle
                    },
                    unit_amount: Math.floor(newPurchase.amount) * 100
                },
                quantity: 1
            }]
            const session = await stripeInstance.checkout.sessions.create({
                success_url: `${origin}/loading/my-enrollments`,
                cancel_url: `${origin}/`,
                line_items: line_items,
                mode: 'payment',
                metadata: {
                    purchaseId: newPurchase._id.toString()
                }
            })
            res.json({ success: true, session_url: session.url })
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }
    //update user course progress

export const updateUserCourseProgress = async(req, res) => {
        try {
            const { userId } = req.auth()
            const { courseId, lectureId } = req.body
            const progressData = await CourseProgress.findOne({ userId, courseId, })
            if (progressData) {
                if (progressData.lectureCompleted.includes(lectureId)) {
                    return res.json({
                        success: true,
                        message: 'Lecture Completed'
                    })
                }
                progressData.lectureCompleted.push(lectureId)
            } else {
                await CourseProgress.create({
                    userId,
                    courseId,
                    lectureCompleted: [lectureId]
                })
            }
            res.json({ success: true, message: 'Progress Updated' })
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }
    //get user Course progress 

export const getUserCourseProgress = async(req, res) => {
    try {
        const { userId } = req.auth()
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId, })
        console.log(progressData)
        res.json({ success: true, progressData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Add user Ratings to Course 

export const addUserRatings = async(req, res) => {
    const { userId } = req.auth()
    const { courseId, rating } = req.body
    if (!userId || !courseId || !rating || rating < 1 || rating > 5) {
        return res.json({ success: false, message: "Missing data!" })
    }
    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.json({ success: false, message: "Course Not Found!" })
        }
        const user = await User.findById(userId)
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, message: "User has not purchased this course." })
        }
        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId)

        if (existingRatingIndex > -1) {
            course.courseRatings[existingRatingIndex].rating = rating;
        } else {
            course.courseRatings.push({ userId, rating })
        }
        await course.save()
        return res.json({ success: true, message: 'Rated!' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//user review of the website
export const addTestimonial = async(req, res) => {
    try {
        const { userId } = req.auth()
        const { feedback, rating } = req.body;

        const user = await User.findById(userId); // assuming you store name, image
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const testimonial = new Testimonial({
            userId,
            name: user.name,
            image: user.image, // stored in user collection
            feedback,
            rating
        });

        await testimonial.save();
        return res.json({ success: true, message: "Testimonial submitted successfully!" });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}