import Express from "express";
import mongoose from 'mongoose';
import BodyParser from "body-parser";
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import blogRoutes from './routes/blogs';
import cors from "cors";

dotenv.config();
const PORT = 5001;
const DB_URL = process.env.DB_URL;


const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
// let db;
app.use('/blogs', blogRoutes);


const server = createServer(app);



server.listen(PORT, async () => {
    const db = await mongoose.connect(DB_URL as string);
    if (db) {
        console.log('db connected');
    }
    console.log('server running on port ', PORT);
});





