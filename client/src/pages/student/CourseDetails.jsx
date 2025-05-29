import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allcourses, navigate } = useContext(AppContext);

  useEffect(() => {
    if (allcourses && allcourses.length > 0) {
      const foundCourse = allcourses.find(course => course._id === id);
      if (foundCourse) {
        setCourseData(foundCourse);
      } else {
        console.error('Course not found!');
      }
    }
  }, [allcourses, id]);

  if (!courseData) {
    return (
      <div className="text-center mt-10">
        <p>Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      <div>
        <h1 className="text-3xl font-bold mb-4">{courseData.courseTitle}</h1>
        <p className="text-gray-700">{courseData.courseDescription}</p>
      </div>
      <div>
      </div>
    </div>
  );
};

export default CourseDetails;
