import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from 'express';
import { default as mongoose } from 'mongoose';
import adminRouter from './routes/admin.route';
const port = process.env.PORT || 4000;

async function server() {
    try {
        const app = express();
        app.use(express.json());
        await mongoose.connect(process.env.MONGODB as string);
        console.log('MongoDB is connected.');
        app.use('/api/admin', adminRouter);
        app.listen(port, () => console.log(`Server connected with ${port}`));
    } catch (error) {
        console.error(error);
    }
}

server();