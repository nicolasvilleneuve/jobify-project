import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import 'express-async-errors';
// db and authentication //
import mongoose from 'mongoose';
import connectDB from "./db/connect.js";

// routers //
import authRouter from './routes/authRoutes.js';
import jobsRouter from "./routes/jobsRoutes.js";

// middleware //
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import morgan from 'morgan';

// deployment stuff //
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import path from 'path';

// security //
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);


app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, './client/build', 'index.html'));
});

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};

start();