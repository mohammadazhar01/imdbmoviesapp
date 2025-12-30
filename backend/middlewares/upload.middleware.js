import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import connectCloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    connectCloudinary,
    params: {
        folder: "movie_posters",
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
})

const upload = multer({storage})

export default upload