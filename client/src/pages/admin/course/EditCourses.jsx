import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourses = () => {
  return (
    <div className='flex-1'>
        <div className='flex items-center justify-between mb-5'>
           <h1 className='font-bold text-xl'>
            Add detail information regarding Course
           </h1>
           <Link to='lecture'>
           <Button className='hover:text-blue-500 ' variant="link">Go to lecture pages</Button>
           </Link>
        </div>
        <CourseTab/>
    </div>
  )
}

export default EditCourses