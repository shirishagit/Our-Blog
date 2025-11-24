import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';

// ADD BLOG
// ADD BLOG
export const addBlog = async (req, res) => {
    try {
        const { title, subtitle, discription, category, isPublished } = req.body;
        const imagefile = req.file;

        // Validation
        if (!title || !discription || !imagefile) {
            return res.status(400).json({
                message: "Title, description and image are required",
                success: false
            });
        }

        // Upload directly from memory buffer
        const response = await imageKit.upload({
            file: imagefile.buffer,  // <-- this is the fix
            fileName: imagefile.originalname,
            folder: "/blogs"
        });

        // Generate optimized Image URL  
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: "80" },
                { width: "1280" },
                { format: "webp" }
            ]
        });

        // Save blog to DB
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
