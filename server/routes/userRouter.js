import express from 'express'
import { addTestimonial, addUserRatings, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.get('/userData', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)
userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.get('/get-course-progress', getUserCourseProgress)
userRouter.post('/add-rating', addUserRatings)
userRouter.post('/add-testimonial', addTestimonial)
export default userRouter