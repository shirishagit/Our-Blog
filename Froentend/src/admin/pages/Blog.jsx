import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext.jsx';
import Footer from '../components/Footer.jsx';



const Blog = () => {

    const {axios} = useAppContext();
    
    
    const {id} = useParams();
    const [data, setData] = useState(null);

    const fetchBlog = async() =>{
        try {
            const {data}  = await axios.get(`/api/blogs/${id}`);
            if(data.success){
                setData(data.blog);
            }
        }
        catch (error) {
            alert("Error fetching blog:", error);
        }
    }

    useEffect(()=>{
        fetchBlog();
    },[])

  return data ? (
    <div>
      <Navbar/>
      <div className=' mt-8 items-center justify-center text-center'>
       
      <h1 className='text-3xl font-bold text-gray-900 my-8 mx-8 sm:mx-16 xl:mx-40'>{data.title}</h1>
        <h6 className='text-xl font-bold text-gray-700 my-8 mx-8 sm:mx-16 xl:mx-40 justify-content-center'>{data.subtitle}</h6>
        </div>
      <div className='mx-8 sm:mx-16 xl:mx-40 mb-24'>
        <img src={data.image} alt={data.subtitle} className='w-full h-auto mb-6 rounded'/>
        <div className='text-gray-700' dangerouslySetInnerHTML={{"__html": data.discription}}></div>
      </div>


 <Footer/>
    </div>
   
    
  ) : <div>Loding .....</div>
}

export default Blog
