import React from 'react'
import { useState,useEffect } from 'react';
import { blog_data } from '../../assets/assets';
import BlogItemTable from './BlogItemTable';
import { useAppContext } from '../../context/appContext.jsx';


const BlogList = () => {

  const {axios} = useAppContext();

  const [blogs,setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blogs/all');
      if (data.success) {
        setBlogs(data.blogs);
      }
    }
    catch (error) {
      alert("Error fetching blogs:", error);
    }

  }

   useEffect(() => {
    fetchBlogs();
    }
    , []);


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen'>
      <h2 className='text-2xl font-semibold text-gray-600 mb-6'>Blog List</h2>
       <div className='relavite h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs- text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-5 py-4 xl:px-6'> #</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                  <th scope='col' className='px-2 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog,index)=>{
                return <BlogItemTable key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default BlogList
