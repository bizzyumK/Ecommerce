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

router.get('/my-orders', getUserOrder);
router.get('/', verifyToken, isAdmin, getAllOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);

export default router;