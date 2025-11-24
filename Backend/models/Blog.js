import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    subtitle : {
        type: String, 
    },
    discription : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        
    },
    image : {
        type: String,
        required: true,
    },
    isPublished : {
        type: Boolean,
        default: false,
        required: true,
    },
},{timestamps: true});


const Blog = mongoose.model('blog', blogSchema);

export default Blog;