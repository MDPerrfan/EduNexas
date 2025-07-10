import express from 'express'
import { getAllCourse, getCoursebyId } from '../controllers/courseController'

const courseRouter = express.Router()


courseRouter.get('/all', getAllCourse)
courseRouter.get('/:id', getCoursebyId)

export default courseRouter