import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
    res.send("hello");
});

export default router;