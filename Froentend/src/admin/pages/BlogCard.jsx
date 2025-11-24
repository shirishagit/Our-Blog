import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentAlt } from '@fortawesome/free-solid-svg-icons';


const BlogCard = ({blog}) => {


    const {title,discription, category,image,_id} = blog;
    const navigate = useNavigate();

  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:shadow-blue/25 duration-300 cursor-pointer'>
    
        <img src={image} alt="" className='aspect-video'/>
        <span className='ml-5 mt-4 py-1 px-3  inline-block bg-blue-200 rounded-full text-gray text-sm'>{category}</span>
        <div className='py-5 px-5'>
            <h5 className='mb-2 font-medium text-gray-900 '>{title}</h5>
            <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html": discription.slice(0,80)}}></p>
       <FontAwesomeIcon icon={faThumbsUp}  className='text-gray-400'/> <span className='text-xs text-gray-400 ml-2'>Likes</span>
          <FontAwesomeIcon icon={faCommentAlt} className='text-gray-400'/>  <span className='text-xs text-gray-400 ml-2'>comments</span>
        </div>
       
      
    </div>
  )
}

export default BlogCard
