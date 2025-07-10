import { clerkClient } from '@clerk/express'
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary'
import { Purchase } from '../models/Purchase.js';
import { User } from '../models/User.js'
export const updateRoleEducator = async(req, res) => {
    try {
        const { userId } = req.auth()
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        })
        res.json({ success: true, message: 'You can now publish courses now.' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//add new course
export const addCourse = async(req, res) => {
        try {
            const { userId } = req.auth()
            const { courseData } = req.body
            const imageFile = req.file
            console.log(userId)
            if (!imageFile) {
                return res.json({ success: false, message: "Thumbnail is not attached" })
            }
            const parsedCourseData = await JSON.parse(courseData)
            parsedCourseData.educator = userId

            const newCourse = await Course.create(parsedCourseData)
            const imageUpload = await cloudinary.uploader.upload(imageFile.path)
            newCourse.courseThumbnail = imageUpload.secure_url

            await newCourse.save()
            res.json({ success: true, message: "Course Added" })
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }
    //getting Educator Courses
export const getEducatorCourses = async(req, res) => {
        try {
            const { educator } = req.auth()
            const courses = await Course.find(educator)
            res.json({ success: true, courses })
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }
    //Get educator dashboard data(total earning,enrolled students,No. of courses)

export const educatorDashboardData = async(req, res) => {
    try {
        const { educator } = req.auth()
        const courses = await Course.find(educator)
        const totalCourses = courses.length
        const courseIds = courses.map(course => course._id)
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        })
        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)
        const enrolledStudentsData = []
        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents },

            }, 'name imageUrl')
            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            })
        }
        res.json({
            status: true,
            dashboardDarta: {
                totalEarnings,
                enrolledStudentsData,
                totalCourses
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get enrolled students data with purchase data
export const getEnrolledStudentsData = async(req, res) => {
    try {
        const { educator } = req.auth()
        const courses = await Course.find(educator)
        const courseIds = courses.map(course => course._id)
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))

        res.json({ success: ture, enrolledStudents })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}