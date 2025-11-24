import express from 'express';
import { adminLogin , getAllBlogsAdmin,getDashboard} from '../controllers/adminController.js';


const adminRouter = express.Router();
// Sample admin route
adminRouter.post('/login', adminLogin);
adminRouter.get('/blogs', getAllBlogsAdmin);
adminRouter.get('/dashboard', getDashboard);

export default adminRouter;