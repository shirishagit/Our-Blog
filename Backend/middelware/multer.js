import multer from "multer";


const upload = multer({
    dest: 'uploads/', // specify the destination directory for uploaded files
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

export default upload;