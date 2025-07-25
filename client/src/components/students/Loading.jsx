import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {
  const {path}=useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(path){
      const timer= setTimeout(()=>{
        navigate(`/${path}`)
      },5000)
      return ()=> clearTimeout(timer) 
    }
  },[])
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>
      </div>
    </>
  )
}

export default Loading
