import React from 'react'
import crose from './pictures/crose.png'
import { useAppContext } from '../../context/appContext.jsx';


const BlogItemTable = ({blog,index,rowId,fetchBlogs}) => {

      const {title,createdAt} = blog;
      const BlogData= new Date(createdAt);

      const {axios} = useAppContext();

      const deleteBlog = async () => {
     const conformDelete = window.confirm("Are you sure you want to delete this blog?");
     if (!conformDelete) return;

  try {
    const { data } = await axios.delete(`/api/blogs/${blog._id}`);
    if (data.success) {
      alert("Blog deleted successfully");
      await fetchBlogs();
    } else {
      alert("Failed to delete the blog");
    }
  } catch(error) {
  alert("Error updating blog status: " + (error.response?.data?.message || error.message));
  }
};


      const togglePublish = async () => {
  try {
    const { data } = await axios.post(`/api/blogs/toggle-publish/${blog._id}`);
    
    if (data.success) {
      alert(`Blog ${blog.isPublished ? 'unpublished' : 'published'} successfully`);
      await fetchBlogs();
    } else {
      alert("Failed to update the blog status");
    }

  } catch (error) {
    alert("Error deleting blog: " + (error.response?.data?.message || error.message));
  }
};



  return (
    <tr className='border-y border-gray-300' id={`blog-item-${rowId}`}>
      <th className='px-2 py-4'>{index}</th>
       <th className='px-2 py-4'>{title}</th>
       <td className='px-2 py-4 max-sm:hidden'>{BlogData.toDateString()}</td>
       <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? "text-green-600" : "text-orange-600"}`}>
            {blog.isPublished ? 'published' : "Unpublished"}</p>
       </td>
       <td className='px-2 py-4 flex text-xs gap-3'>
        <button  onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? 'unPublish' : 'Publish'}</button>
        <img src={crose} alt="" onClick={deleteBlog} className='w-6 hover:scale-110 transition-all cursor-pointer'/>
       </td>
    </tr>
  )
}

export default BlogItemTable
