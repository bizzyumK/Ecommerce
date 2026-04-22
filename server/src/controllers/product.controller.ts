import { Request, Response } from "express";
import { Product } from "../model/product.model";
import { deleteCloudinaryImages } from "../services/deleteCloudinary";

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: product
        });
    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}

export async function getAllProduct(req: Request, res: Response) {
    try {
        const products = await Product.find();
        return res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function createProduct(req: Request, res: Response) {
    //Note: This is made to handle single data at a time
    // to achieve bulk of data:
    // create a empty array []
    // then store bulk of data from req.body to it then
    // iterate over that array and store it in db
    try {
        const { name, price, description, sizes, stock, category } = req.body;

        if (!name || price === undefined || !description || !sizes || sizes.length === 0 || stock === undefined || !category) {
            return res.status(400).json({
                message: "All fields are required",
                status: false
            });
        }
        //To convert from string to array Eg-> user passes the data like xl, xxl === "xl, xxl":string(must avoid)
        const parseSizeToArray = typeof sizes === "string"
            ? sizes.split(",").map(s => s.trim())  //remove space such as [x, xl] => [x,xl]
            : sizes.map((s: string) => s.trim());

        const files = req.files as Express.Multer.File[]
        if (!files || files.length === 0) {
            return res.status(400).json({
                message: "At least one image is required"
            });
        }

        //get image urls and publicId(filename) from req.file(multer create it automatically)
        const imageUrls = files.map((file) => {
            return { url: file.path, publicId: file.filename }
        });

        const productDetail = await Product.create({
            name,
            price,
            description,
            images: imageUrls,
            sizes: parseSizeToArray,
            stock,
            category
        });

        return res.status(201).json({
            message: "Product added successfully",
            data: productDetail
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error(Error uploading product)"
        });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // return updated data
        );
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const images = product.images.map((img) => {
            //This tells typscript url, publicId is not undefined
            return {
                url: img.url!,
                publicId: img.publicId!
            }
        });

        await deleteCloudinaryImages(images);
        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}