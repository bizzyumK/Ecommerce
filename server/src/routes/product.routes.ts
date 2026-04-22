import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    updateProduct
} from '../controllers/product.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/admin.middleware';
import { upload } from '../middleware/multer.middleware';

const router = express.Router();

router.get('/', getAllProduct);
router.get('/:id', getProductById);
router.post('/', verifyToken, isAdmin, upload.array("images", 5), createProduct);
router.put('/:id', verifyToken, isAdmin, upload.array("images", 5), updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;