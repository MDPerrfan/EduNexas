import { createContext, useEffect, useState } from "react";
import {  dummyStudentEnrolled, dummyTestimonial } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import {toast} from 'react-toastify'
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allcourses, setAllcourses] = useState([]);
  const [testimonials, setTestimonials] = useState([])
  const [isEducator, setIsEducator] = useState(true)
  const [enrolledcourses, setEnrolledcourses] = useState([])
  const [enrolledStudents, setEnrolledStudents] = useState([])
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const currency = 'BDT'

  const { getToken } = useAuth()
  const { user } = useUser()

  //get all courses
  const getAllcourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/all')
      if (data.success) {
        setAllcourses(data.courses)
      } else {
        toast.error("Courses not found!")
      }
    } catch (error) {
      console.error(error.message)
      toast.error("Failed to load courses. Please try again later."); // For user

    }
  }
  //calculate the average rating
  const avgRating = (course) => {
    if (course.courseRatings.length == 0) {
      return 0;
    }

    let totalRatings = 0;
    course.courseRatings.forEach(rating => {
      totalRatings += rating.rating;
    })

    return totalRatings / course.courseRatings.length
  }
  //get all testimonials 
  const getTestimonials = () => {
    setTestimonials(dummyTestimonial)
  }
  //Function to calculate chapter time
  const calculateChaptertime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lec) => time += lec.lectureDuration)
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
  }
  //Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0
    course.courseContent.map((chapter) => chapter.chapterContent.map(
      (lec) => time += lec.lectureDuration
    ))
    return humanizeDuration(time * 60 * 1000, { unites: ["h", "m"] })
  }
  //Function to calculate no of lectures
  const calculateNoOfLectures = (course) => {
    let totalLec = 0
    course.courseContent.forEach(chapter => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLec += chapter.chapterContent.length
      }
    })
    return totalLec
  }
  //Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
  }
  //Fetch Enrolled Students
  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }
  useEffect(() => {
    getAllcourses();
    getTestimonials();
    fetchUserEnrolledCourses()
    fetchEnrolledStudents()
  }, [])
 
  const logToken = async () => {
    console.log(await getToken())
  }
  useEffect(() => {
    if (user) {
      logToken()
    }
  }, [user])
  const value = {
    allcourses,
    setAllcourses,
    navigate,
    avgRating,
    isEducator,
    setIsEducator,
    testimonials,
    calculateChaptertime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
    enrolledcourses,
    enrolledStudents
  }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}