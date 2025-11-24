import express from 'express';
import { addBlog } from '../controllers/blogController.js';
import upload from '../middelware/multer.js';
import auth from '../middelware/auth.js';
import { getAllBlogs } from '../controllers/blogController.js';
import { getBlogById } from '../controllers/blogController.js';
import { deleteBlogById } from '../controllers/blogController.js';
import { togglePublish } from '../controllers/blogController.js';



const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image'), addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.post('/toggle-publish/:blogId',auth, togglePublish);
blogRouter.get('/:blogId', getBlogById);
blogRouter.delete('/:blogId',auth, deleteBlogById);


export default blogRouter;