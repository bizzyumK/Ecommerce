import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getProduct);
router.get('/:id', getAllProduct);
router.post('/', createProduct,);
router.put('/:id', updateProduct,);
router.delete('/:id', deleteProduct);

export default router;