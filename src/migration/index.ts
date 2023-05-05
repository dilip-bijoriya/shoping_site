import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose';
import { AdminMigration } from './admin.migrate';
dotenv.config();

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGODB as string);
        await AdminMigration();

        console.log('Migration Successful.');
    } catch (err) {
        console.error('Migration Creashed', err);
    }

}

migrate();