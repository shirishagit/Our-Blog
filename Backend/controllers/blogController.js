import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';

// ADD BLOG
export const addBlog = async (req, res) => {
    try {
        const { title, subtitle, discription, category, isPublished } = req.body;
        const imagefile = req.file;

        if (!title || !discription || !imagefile) {
            return res.status(400).json({
                message: "Title, description and image are required",
                success: false
            });
        }

        const fileBuffer = fs.readFileSync(imagefile.path);

        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imagefile.originalname,
            folder: "/blogs"
        });

        fs.unlink(imagefile.path, () => {});

        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: "80" },
                { width: "1280" },
                { format: "webp" }
            ]
        });

        await Blog.create({
            title,
            subtitle,
            discription,
            category,
            image: optimizedImageUrl,
            isPublished: isPublished === "true" || isPublished === true
        });

        return res.status(201).json({
            message: "Blog added successfully",
            success: true
        });

    } catch (error) {
        console.log("🔥 Error in addBlog:", error);
        return res.status(500).json({
            message: "Error adding blog",
            success: false
        });
    }
};


// FETCH ALL BLOGS (ADMIN)
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ blogs, success: true });
    } catch (error) {
        res.json({ message: "Error fetching blogs", success: false });
    }
};


// GET BLOG BY ID
export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findOne({ _id: blogId });
        res.json({ blog, success: true });
    }
    catch (error) {
        res.json({ message: "Error fetching blog", success: false });
    }
};


// DELETE BLOG
export const deleteBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        await Blog.findByIdAndDelete(blogId);

        res.json({ message: "Blog deleted successfully", success: true });
    }
    catch (error) {
        res.json({ message: "Error deleting blog", success: false });
    }
};


// TOGGLE PUBLISH
export const togglePublish = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            });
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.json({
            message: "Blog status updated",
            success: true
        });
    }
    catch (error) {
        res.json({ message: "Error toggling publish status", success: false });
    }
};
