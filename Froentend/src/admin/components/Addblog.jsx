import React from 'react'
import { useState } from 'react';
import { useAppContext } from '../../context/appContext.jsx';


const Addblog = () => {

  const {axios , token} = useAppContext();
  const [isAdded,setIsAdded] = useState(false);
   
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('select');
    const [isPublished,setIsPublished] = useState(false);
    const [subtitle,setSubtitle] = useState('');
    const [image,setImage] = useState(null);
    const [discription,setDiscription] = useState('');

   const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    setIsAdded(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("category", category);
    formData.append("discription", discription);
    formData.append("isPublished", isPublished);
    formData.append("image", image);

    const { data } = await axios.post(
      "/api/blogs/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (data.success) {
      alert("Blog added successfully");

      setTitle('');
      setSubtitle('');
      setCategory('select');
      setDiscription('');
      setIsPublished(false);
      setImage(null);
    } else {
      alert("Error adding blog");
    }

  } catch (error) {
    console.log("🔥 FULL ERROR:", error);
    alert("Error adding blog: " + error);
  } finally {
    setIsAdded(false);
  }
};

  


  return (
    <form  id="form-data" onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className=' bg-white pt-5 px-5 sm:pt-12 sm:pl-16 min-h-screen'>
        <h2 className='text-2xl font-semibold mb-6'>Add Blog</h2>
        <div className='flex flex-col gap-6 max-w-3xl '>
          <div className='flex flex-col gap-2 '>
            <label htmlFor="title" className='font-medium '>Blog Title</label>
            <input type="text" id='title' placeholder='Blog Title' className='w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-blue-500 transition-all'
            onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="subtitle" className='font-medium'>Subtitle Title</label>
            <input type="text" id='subtitle' placeholder='Subtitle' className='w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-blue-500 transition-all'
            onChange={(e)=>setSubtitle(e.target.value)} value={subtitle}/>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="category" className='font-medium'>Category</label>
            <select id="category" /* ... */ onChange={e=> setCategory(e.target.value)} value={category} className='w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-blue-500 transition-all'>
    <option value="select" disabled>Select Category</option> {/* Added a matching value for initial state */}
    <option value="Technology">Technology</option>
    <option value="Startups">Startups</option>
    <option value="Lifestyle">Lifestyle</option>
    <option value="Science">Science</option>
    <option value="Finance">Finance</option>
</select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="content" className='font-medium'>Blog Description</label>
            <textarea id="content" rows="10" placeholder='Blog description' className='w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-blue-500 transition-all'
             onChange={e=> setDiscription(e.target.value)} value={discription}></textarea>
          </div>
          <div className='flex gap-2 mt-4'>
            <p>Publish Now</p>
            <input type="checkbox" name='isPublish' checked={isPublished} className='scale-100 cursor-pointer' onChange={e=>setIsPublished(e.target.checked)} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="image" className='font-medium'>Add Image</label>
            <img src={!image ? "Addimage" : URL.createObjectURL(image)  } alt="" className='mt-1 h-16 rounded cursor mt-2  w-20 pointer'/>
            <input onChange={(e)=>setImage(e.target.files[null])} type="file" id='image' className='w-full border-1 p-2 '/>
          </div>
          <button type='submit' disabled={isAdded} className='bg-blue-700 text-white px-6 py-2 rounded m-6 hover:scale-105 transition-all cursor-pointer w-max'>
            {isAdded ? "Adding...." : "Add Blog"}</button>
        </div>

      </div>
    </form>
  )
}

export default Addblog
