import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleEducator } from '../controllers/educatorController.js'
import upload from '../config/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'


const educatorRouter = express.Router()

//add educator role

educatorRouter.get('/update-role', updateRoleEducator)
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)
educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)
export default educatorRouter