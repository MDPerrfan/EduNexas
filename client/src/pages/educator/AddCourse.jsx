import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(null); // 'chapter' or 'lecture'
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [newChapterTitle, setNewChapterTitle] = useState('');

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) return;
    setChapters(prev => [
      ...prev,
      {
        id: uniqid(),
        chapterTitle: newChapterTitle,
        chapterContent: [],
        collapsed: false
      }
    ]);
    setNewChapterTitle('');
    setShowPopup(null);
  };

  const handleAddLecture = () => {
    if (
      !lectureDetails.lectureTitle.trim() ||
      !lectureDetails.lectureDuration.trim() ||
      !lectureDetails.lectureUrl.trim()
    ) return;

    setChapters(prev =>
      prev.map(chapter =>
        chapter.id === currentChapterId
          ? {
              ...chapter,
              chapterContent: [...chapter.chapterContent, lectureDetails]
            }
          : chapter
      )
    );

    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false
    });
    setCurrentChapterId(null);
    setShowPopup(null);
  };

  const toggleCollapse = (id) => {
    setChapters(prev =>
      prev.map(chapter =>
        chapter.id === id
          ? { ...chapter, collapsed: !chapter.collapsed }
          : chapter
      )
    );
  };

  const deleteLecture = (chapterId, lectureIndex) => { // Renamed 'index' to 'lectureIndex' for clarity
    setChapters(prev =>
      prev.map(ch =>
        ch.id === chapterId
          ? {
              ...ch,
              chapterContent: ch.chapterContent.filter((_, i) => i !== lectureIndex),
            }
          : ch
      )
    );
  };

  // Function to delete a chapter
  const deleteChapter = (chapterId) => {
    setChapters(prev => prev.filter(chapter => chapter.id !== chapterId));
  };

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input
            onChange={e => setCourseTitle(e.target.value)}
            type="text"
            value={courseTitle}
            placeholder='Type here'
            className='outline-none md:py-2.5 py-2 rounded border border-gray-500 px-2'
            required
          />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef} />
        </div>

        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input
              type="number"
              placeholder='0'
              onChange={e => setCoursePrice(e.target.value)}
              value={coursePrice}
              className='outline-none md:py-2.5 py-2 rounded border border-gray-500 px-2'
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <p>Discount%</p>
            <input
              type="number"
              onChange={e => setDiscount(e.target.value)}
              min={0}
              max={100}
              value={discount}
              placeholder='0'
              className='outline-none md:py-2.5 py-2 rounded border border-gray-500 px-2'
              required
            />
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded' />
              <input
                type="file"
                id='thumbnailImage'
                onChange={e => setImage(e.target.files[0])}
                accept='image/*'
                hidden
              />
              <img className='max-h-10' src={image ? URL.createObjectURL(image) : ''} alt="" />
            </label>
          </div>
        </div>

        {/* Chapters and Lectures */}
        <div>
          {
            chapters.map((chapter, index) => (
              <div key={chapter.id} className='bg-white border rounded-lg mb-4'>
                <div className='flex justify-between items-center p-4 border-b'>
                  <div className='flex items-center'>
                    <img
                      src={assets.dropdown_icon}
                      alt=""
                      width={14}
                      className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && '-rotate-90'}`}
                      onClick={() => toggleCollapse(chapter.id)}
                    />
                    <span className='font-semibold'>{index + 1}. {chapter.chapterTitle}</span>
                  </div>
                  <span>{chapter.chapterContent.length} Lectures</span>
                  <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={() => deleteChapter(chapter.id)} />
                </div>

                {!chapter.collapsed && (
                  <div className='p-4'>
                    {
                      chapter.chapterContent.map((lecture, idx) => (
                        <div key={idx} className='flex justify-between items-center mb-2'>
                          <span>
                            {idx + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' rel="noreferrer" className='text-blue-500'>Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                          </span>
                          <img
                            src={assets.cross_icon}
                            alt=""
                            className='cursor-pointer'
                            onClick={() => deleteLecture(chapter.id, idx)} // Corrected call
                          />
                        </div>
                      ))
                    }
                    <div
                      className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'
                      onClick={() => {
                        setCurrentChapterId(chapter.id);
                        setShowPopup('lecture');
                      }}
                    >
                      + Add Lecture
                    </div>
                  </div>
                )}
              </div>
            ))
          }

          <div
            className='flex justify-center items-center bg-orange-100 p-2 cursor-pointer'
            onClick={() => setShowPopup('chapter')}
          >
            + Add Chapter
          </div>
        </div>

        <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4'>ADD</button>
      </form>
      {/* Add Lecture Popup */}
      {showPopup === 'lecture' && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
            <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>
            <div className='mb-2'>
              <p>Lecture Title</p>
              <input
                type="text"
                className='mt-1 block w-full border rounded py-1 px-2'
                value={lectureDetails.lectureTitle}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
              />
            </div>
            <div className='mb-2'>
              <p>Duration (mins)</p>
              <input
                type="text"
                className='mt-1 block w-full border rounded py-1 px-2'
                value={lectureDetails.lectureDuration}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
              />
            </div>
            <div className='mb-2'>
              <p>Lecture URL</p>
              <input
                type="text"
                className='mt-1 block w-full border rounded py-1 px-2'
                value={lectureDetails.lectureUrl}
                onChange={e => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
              />
            </div>
            <div className='flex gap-2 my-4 items-center'>
              <p>Is Preview Free?</p>
              <input
                type="checkbox"
                className='scale-125'
                checked={lectureDetails.isPreviewFree}
                onChange={e => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
              />
            </div>
            <button
              type='button'
              className='w-full bg-orange-400 text-white px-4 py-2 rounded'
              onClick={handleAddLecture}
            >
              Add
            </button>
            <img
              src={assets.cross_icon}
              alt=""
              onClick={() => setShowPopup(null)} // This should close the popup
              className='absolute top-4 right-4 w-4 cursor-pointer'
            />
          </div>
        </div>
      )}
      {/* Add Chapter Popup */}
      {showPopup === 'chapter' && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
            <h2 className='text-lg font-semibold mb-4'>Add Chapter</h2>
            <div className='mb-4'>
              <p>Chapter Title</p>
              <input
                type="text"
                className='mt-1 block w-full border rounded py-1 px-2'
                value={newChapterTitle}
                onChange={e => setNewChapterTitle(e.target.value)}
              />
            </div>
            <button
              type='button'
              className='w-full bg-orange-400 text-white px-4 py-2 rounded'
              onClick={handleAddChapter}
            >
              Add
            </button>
            <img src={assets.cross_icon} alt="" onClick={() => setShowPopup(null)} className='absolute top-4 right-4 w-4 cursor-pointer' />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;