import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

//use new keyword because CloudinaryStorage is an class
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "products",
        allowed_formats: ["jpg", "png", "jpeg"],
    } as any,
});

export const upload = multer({ storage });