import Course from '../models/Course.js';
import mongoose from 'mongoose'

//get all courses

export const getAllCourse = async(req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).select(['-enrolledStudents -courseContent']).populate({ path: 'educator' })
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// Controller
export const getCourseById = async(req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id).populate('educator');
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        // Hide lectureUrl if not preview
        course.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) lecture.lectureUrl = '';
            });
        });
        res.json({ success: true, data: course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};