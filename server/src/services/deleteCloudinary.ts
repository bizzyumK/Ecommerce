import cloudinary from "../config/cloudinary";

//specify the type for object
type Image = {
    url: string;
    publicId: string;
};

export async function deleteCloudinaryImages(images: Image[]) {
    // eg cloudinary image: https://res.cloudinary.com/dzmizppsd/image/upload/q_auto/f_auto/v1776761276/products/byfgsfbqmfgoewn4n4vx.jpg
    try {
        for (let image of images) {
            await cloudinary.uploader.destroy(image.publicId);
        }
    } catch (err) {
        console.log("Error deleting images from Cloudinary", err);
    }
}