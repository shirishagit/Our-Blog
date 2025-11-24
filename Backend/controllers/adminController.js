import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import Blog from '../models/Blog.js';

export const adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET);
            
            // ✅ FIX: Added 'return' here so the function stops after success
            return res.status(200).json({ token, success: true });
        } 
        
        // This line will now only run if the 'if' condition was false
        return res.json({ message: "Invalid Credentials", success: false });
        
    } catch (error) {
        // It is also good practice to return here, though not strictly required if it's the last line
        return res.json({ message: "Error logging in", success: false });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const  blogs = await Blog.find().sort({ createdAt: -1 });
        return res.status(200).json({ blogs, success: true });
        
    } catch (error) {
       return res.json({ message: "Error logging in", success: false });  
    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished : false });

        const dashboardData = { recentBlogs, blogs, drafts };
        return res.status(200).json({ dashboardData, success: true });
    } catch (error) {
        return res.json({ message: "Error fetching dashboard data", success: false });
    }
}


