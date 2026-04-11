import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    updateProduct
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getAllProduct);
router.get('/:id', getProductById);
router.post('/', createProduct,);
router.put('/:id', updateProduct,);
router.delete('/:id', deleteProduct);

export default router;