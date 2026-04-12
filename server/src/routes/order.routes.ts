import express from 'express';
import {
    getUserOrder,
    getAllOrder,
    createOrder,
    updateOrder
} from '../controllers/order.controller';
import { isAdmin } from '../middleware/admin.middleware';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/my-orders', verifyToken, getUserOrder);
router.get('/', verifyToken, isAdmin, getAllOrder);
router.post('/', verifyToken, createOrder);
router.put('/:id', verifyToken, isAdmin, updateOrder);

export default router;