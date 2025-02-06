import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/student/Home.jsx'
import CourseList from './pages/student/CourseList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/students/Loading.jsx'
const App = () => {
  return (
    <>
      <Routes>
        {/*Routes for student*/}        
        <Route path='/' element={<Home/>} />
        <Route path='/course-list' element={<CourseList/>} />
        <Route path='/course-list/:input' element={<CourseList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollents' element={<MyEnrollments/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />
        {/* Routes for educator */}

        
      </Routes>
    </>
  )
}

export default App
