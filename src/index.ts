import './types/extend.interface'
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from 'express';
import { default as mongoose } from 'mongoose';
import adminRouter from './routes/admin.route';
import publicRouter from './routes/public.route';
import cors from 'cors';
const port = process.env.PORT || 4000;

async function server() {
    try {
        const app = express();
        app.use(express.json());
        app.use(cors({ origin: '*' }));
        await mongoose.connect(process.env.MONGODB as string);
        console.log('MongoDB is connected.');
        app.use('/api/admin', adminRouter);
        app.use('/api/public', publicRouter);
        app.listen(port, () => console.log(`Server connected with ${port}`));
    } catch (error) {
        console.error(error);
    }
}

server();