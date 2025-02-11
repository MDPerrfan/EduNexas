import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [allcourses, setAllcourses] = useState([])
    //get all courses
    const getAllcourses = async () => {
        setAllcourses(dummyCourses);
    }
    useEffect(()=>{
        getAllcourses();
    },[])
    const value = {
        allcourses,
        setAllcourses,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}