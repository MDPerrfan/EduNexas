import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Loading from '../../components/students/Loading'
import YouTube from 'react-youtube'
import Footer from '../../components/students/Footer'
import Rating from '../../components/students/Rating'
const Player = () => {
  const { enrolledcourses, calculateChaptertime } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [opensection, setOpensection] = useState({})
  const [playerData, setPlayerData] = useState(null)


  const getCourseData = async () => {
    enrolledcourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course)
      }
    })
  }
  const toggleSection = (index) => {
    setOpensection((prev) => (
      {
        ...prev,
        [index]: !prev[index],
      }
    ))
  }
  useEffect(() => {
    getCourseData()
  }, [enrolledcourses])
  if (!courseData) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-32'>
        <div className='text-gray-800'>{/*left column*/}
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img src={assets.down_arrow_icon} alt="arr_icon" className={`transform transition-transform ${opensection[index] ? 'rotate-180' : ''}`} />
                    <p className='font-medium md:text-base'>{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent.length}lectures - {calculateChaptertime(chapter)}</p>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${opensection[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lec, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play_icon" className='w-4 h-4 mt-1' />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lec.lectureTitle}</p>
                          <div className='flex gap-2 '>
                            {lec.lectureUrl && <p onClick={() => setPlayerData({
                              ...lec, chapter: index + 1, lec: i + 1
                            })}
                              className='text-blue-500 cursor-pointer'>Watch</p>}
                            <p>{humanizeDuration(lec.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this course:</h1>
            <Rating initialRating={0}/>
          </div>
        </div>
        <div className='md:mt-10'>{/*right column*/}
          {
            playerData ? (
              <div>
                <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video' />
                <div className='flex justify-between items-center mt-1'>
                  <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                  <button className='text-blue-600'>{false ? "Completed" : "Mark Complete"}</button>
                </div>
              </div>

            )
              :
              <img src={courseData ? courseData.courseThumbnail : ""} alt="" />

          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Player
