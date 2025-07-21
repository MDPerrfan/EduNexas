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
  const [userdata,setUserData]=useState([])
  const [testimonials, setTestimonials] = useState([])
  const [isEducator, setIsEducator] = useState(false)
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
  //get UserData 
  const getUserData = async()=>{
    if(user.publicMetadata.role==='educator'){
      setIsEducator(true)
    }
    try{
      const token = await getToken()
      console.log(token)
      const {data}=await axios.get(backendUrl+'/api/user/userData',{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        setUserData(data.user)
      }else{
        toast.error("User not found!")
      }
    }catch (error) {
      console.error(error.message)
      toast.error("Failed to load user"); // For user

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

    return Math.floor(totalRatings / course.courseRatings.length)
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
     try{
      const token = await getToken()
      const {data}=await axios.get(backendUrl+'/api/user/enrolled-courses',{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        setEnrolledcourses(data.enrolledCourses)
      }else{
        toast.error(data.message)
      }
    }catch (error) {
      console.error(error.message)
      toast.error(error.message); // For user

    }
  }
  //Fetch Enrolled Students
  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }
  useEffect(() => {
    getAllcourses();
    getTestimonials();
    fetchEnrolledStudents()
  }, [])
 
 
  useEffect(() => {
    if (user) {
      getUserData()
      fetchUserEnrolledCourses()
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
    enrolledStudents,
    backendUrl,
    userdata,
    setUserData,
    getToken,
    getAllcourses
  }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}