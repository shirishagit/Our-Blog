import React, { useEffect } from 'react';
import dashboard from './pictures/dashboard.png'
import listblog from './pictures/listblog.png'
import comments from './pictures/comments.png'
import recenticon from './pictures/recenticon.png'
import { useState } from 'react';
import BlogItemTable from './BlogItemTable';
import { useAppContext } from '../../context/appContext';



const Dashboard = () => {

 
 
  const [dashboardData,setDashboardData] = useState({
      blogs:0,
      comments:0,
      drafts:0,
      recentBlogs:[]
  })

  const {axios} = useAppContext();
   
  const fetchDashboardData= async ()=>{
     try {
       const {data} = await axios.get('/api/admin/dashboard');
        if(data.success){
          setDashboardData(data.dashboardData);
        }
     } catch (error) {
        console.log("Error fetching dashboard data:", error);
     }
  }

  useEffect(()=>{
    fetchDashboardData()
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
   
      <div >
         <div className='flex flex-wrap gap-4'>
           <div className='flex items-center gap-4 bg-4 bg-white p-4 min-w-58 rounded shadow
            cursor-pointer hover:scale-105 transition-all'>
            <img src={dashboard} alt="" className='min-w-4 w-7 border rounded-9' />
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
           </div>
            <div className='flex items-center gap-4 bg-4 bg-white p-4 min-w-58 rounded shadow
            cursor-pointer hover:scale-105 transition-all'>
            <img src={comments} alt="" className='min-w-4 w-7 b-2' />
            <p className='text-xl font-semibold text-primary-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light '>Comments</p>
           </div>
            <div className='flex items-center gap-4 bg-4 bg-white p-4 min-w-58 rounded shadow
            cursor-pointer hover:scale-105 transition-all'>
            <img src={listblog} alt="" className='min-w-4 w-7 b-2' />
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
           </div>
         </div>
         
         
      </div>
       <div >
        <div className='flex item-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={recenticon} alt=""  className='w-6'/>
          <p>Recent Blogs</p>
        </div>
        <div className='relavite max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-5 py-4 xl:px-6'> #</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                  <th scope='col' className='px-2 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog,index)=>{
                return <BlogItemTable key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index+1}/>
              })}
            </tbody>
          </table>
        </div>
       </div>
     
    </div>
  );
};

export default Dashboard;