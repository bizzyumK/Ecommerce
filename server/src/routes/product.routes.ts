import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    updateProduct
} from '../controllers/product.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllProduct);
router.get('/:id', getProductById);
router.post('/', verifyToken, createProduct,);
router.put('/:id', verifyToken, updateProduct,);
router.delete('/:id', verifyToken, deleteProduct);

export default router;