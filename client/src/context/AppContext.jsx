import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [allcourses, setAllcourses] = useState([]);
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
    useEffect(() => {
        getAllcourses();
    }, [])
    const value = {
        allcourses,
        setAllcourses,
        navigate,
        avgRating
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}