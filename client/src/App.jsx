import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Home from './pages/student/Home.jsx'
import CourseList from './pages/student/CourseList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/students/Loading.jsx'
import Educator from './pages/educator/Educator.jsx'
import Dashboard from './pages/educator/Dashboard.jsx'
import MyCourses from './pages/educator/MyCourses.jsx'
import AddCourse from './pages/educator/AddCourse.jsx'
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx'
import Navbar from './components/students/Navbar.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "quill/dist/quill.snow.css"
const App = () => {
  const isEducatorRoute = useMatch('/educator/*');
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        {/*Routes for student*/}        
        <Route path='/' element={<Home/>} />
        <Route path='/course-list' element={<CourseList/>} />
        <Route path='/course-list/:input' element={<CourseList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />
        {/* Routes for educator */}
        <Route path='/educator' element={<Educator/>}>
          <Route path='educator' element={<Dashboard/>} />
          <Route path='my-courses' element={<MyCourses/>} />
          <Route path='add-course' element={<AddCourse/>} />
          <Route path='student-enrolled' element={<StudentsEnrolled/>} />
        </Route>
        
      </Routes>
       <ToastContainer
        position="top-right" // You can change this
        autoClose={5000}     // Auto close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // "light", "dark", "colored"
      />
    </div>
  )
}

export default App
