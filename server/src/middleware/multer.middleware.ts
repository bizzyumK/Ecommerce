import multer from "multer";//handle multipart/formdata(file upload)
import { CloudinaryStorage } from "multer-storage-cloudinary";//custom storage->instead of savin file to disk, it stores in cloudinary
import cloudinary from "../config/cloudinary";//authenticated connection

//use new keyword because CloudinaryStorage is an class
const storage = new CloudinaryStorage({
    cloudinary,//which account to use
    params: {
        folder: "products",//stores files in folder /products
        allowed_formats: ["jpg", "png", "jpeg"],
    } as any,
});

export const upload = multer({ storage });//this upload object will be used to handle file uploads