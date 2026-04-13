import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import auth from './routes/auth.routes';
import product from './routes/product.routes';
import order from './routes/order.routes';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigin = {
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST, PUT, DELETE',
    credentials: true
};
app.use(cors(allowedOrigin));
connectDB();

app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/order', order);

const PORT = process.env.PORT || 5004
app.listen(PORT, () => {
    console.log("server is running at Port: ", PORT);
});