import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import auth from './routes/auth.routes';
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get("/", (_, res) => {
    res.json({ name: "user" });
});
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5004
app.listen(PORT, () => {
    console.log("server is running at Port: ", PORT);
});