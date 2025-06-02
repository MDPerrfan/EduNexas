import { createContext, useEffect, useState } from "react";
import { dummyCourses,dummyTestimonial } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [allcourses, setAllcourses] = useState([]);
    const[testimonials,setTestimonials]=useState([])
    const[isEducator,setIsEducator]=useState(true)
    const navigate = useNavigate()
    //get all courses
    const getAllcourses = async () => {
        setAllcourses(dummyCourses);
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
    
        return totalRatings/course.courseRatings.length
    }
    //get all testimonials 
    const getTestimonials=()=>{
        setTestimonials(dummyTestimonial)
    }
      //Function to calculate chapter time
  const calculateChaptertime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lec) => time += lec.lectureDuration)
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
  }
  //Function to calculate course duration
  const calculateCourseDuraton=(course)=>{
    let time =0
    course.courseContent.map((chapter)=>chapter.chapterContent.map(
      (lec)=>time+=lec.lectureDuration
    ))
    return humanizeDuration(time*60*1000,{unites:["h","m"]})
  }
  //Function to calculate no of lectures
  const calculateNoOfLectures=(course)=>{
    let totalLec=0
    course.courseContent.forEach(chapter=>{
      if(Array.isArray(chapter.chapterContent)){
        totalLec+=chapter.chapterContent.length
      }
    })
    return totalLec
  }
    useEffect(() => {
        getAllcourses();
        getTestimonials();
    }, [])
    const value = {
        allcourses,
        setAllcourses,
        navigate,
        avgRating,
        isEducator,
        setIsEducator,
        testimonials,
        calculateChaptertime,
        calculateCourseDuraton,
        calculateNoOfLectures
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}